import sparqlTransformer from 'sparql-transformer';
import jsonfile from 'jsonfile';
import clone from 'clone';
import Sparql from '../../commons/sparql';
import {
  sendStandardError
} from '../../commons/utils';

var sparql = new Sparql();

const PERFORMANCE_QUERY = jsonfile.readFileSync('server/queries/expression.performance.json');
const PUBLICATION_QUERY = jsonfile.readFileSync('server/queries/expression.publication.json');
const LIST_QUERY = jsonfile.readFileSync('server/queries/expression.list.json');

function padProp(p) {
  'use strict';
  let pre = ((p === 'id') ? '@' : '');
  return pre + p;
}

function smartMerge(candidateValue, oldValue) {
  'use strict';
  let cv = candidateValue;
  let ov = oldValue;
  if (!ov || ov === cv) return cv;

  if (ov.uri && ov.uri === cv.uri) return cv;
  if (ov['@value'] && ov['@value'] === cv['@value']) return cv;

  if (Array.isArray(ov)) {
    if (cv.uri) {
      if (ov.every(p => p.uri !== cv.uri))
        ov.push(cv);
    } else if (cv['@value']) {
      if (ov.every(p => p['@value'] !== cv['@value']))
        ov.push(cv);
    } else if (!ov.includes(cv)) ov.push(cv);
    return ov;
  }

  return [ov, cv];
}


function array2obj(input, mergeKey, splitOn = '_') {
  input.forEach(l => { //line
    Object.keys(l).forEach(k => {
      let current = l[k];
      let v = current.value,
        lang = current['xml:lang'],
        datatype = current.datatype;

      if (datatype && datatype === 'http://www.w3.org/2001/XMLSchema#int')
        v = parseInt(v);
      let considerLang = (k === 'alternateName' && lang);

      l[k] = considerLang ? {
        '@value': v,
        '@language': lang
      } : v;
    });
    Object.keys(l).forEach(k => {
      if (!k.includes(splitOn)) return;
      let [k1, k2] = k.split(splitOn);
      if (!l[k1]) l[k1] = {};
      l[k1][k2] = l[k];
      delete l[k];
    });
  });

  let output = [];
  let uniques = Array.from(new Set(input.map(item => item[mergeKey])));

  uniques.forEach(x => {
    let subset = input.filter(item => item[mergeKey] === x);
    let obj = {};

    subset.forEach(item => {
      Object.keys(item).forEach(k => {
        obj[k] = smartMerge(item[k], obj[k]);
      });
    });
    output.push(obj);
  });
  return output[0];
}

export default class ExpressionController {

  static get(req, res) {
    let uri = `<http://data.doremus.org/expression/${req.params.id}>`;
    sparql.loadQuery('expression.detail', {
        uri,
        lang: req.query.lang
      })
      .then(r => {
        let data = r.results.bindings;
        let expression = array2obj(data, 'expression');

        if (expression.alternateName) {
          if (!Array.isArray(expression.alternateName))
            expression.alternateName = [expression.alternateName];
          expression.alternateName = expression.alternateName
            .filter(a => a['@language'] || a !== expression.name);
        }

        if (!expression.derivation)
          return Promise.resolve(expression);

        let query = clone(LIST_QUERY);
        query.$lang = req.query.lang || 'en';
        query.$where.push(`?work efrbroo:R9_is_realised_in ${uri}`);
        query.$where.push('?work efrbroo:R2_is_derivative_of / efrbroo:R9_is_realised_in ?id');

        return sparqlTransformer(query, {
          endpoint: 'http://data.doremus.org/sparql',
          debug: true
        }).then(der => {
          console.log(der);
          expression.derivativeOf = der['@graph'][0];
          return expression;
        });
      })
      .then(result => {
        result['@id'] = 'http://overture.doremus.org' + req.originalUrl;
        result.generatedAt = (new Date()).toISOString();
        res.json(result);
      })
      .catch(err => sendStandardError(res, err));
  }

  static getRealisations(req, res) {
    let queryPe = clone(PERFORMANCE_QUERY);
    let queryPu = clone(PUBLICATION_QUERY);
    for (let query of [queryPe, queryPu]) {
      query.$lang = req.query.lang || 'en';
      query.$values = {
        'expression': `<http://data.doremus.org/expression/${req.params.id}>`
      };
    }

    let promisePe = sparqlTransformer(queryPe, {
      endpoint: 'http://data.doremus.org/sparql',
      debug: true
    });
    let promisePu = sparqlTransformer(queryPu, {
      endpoint: 'http://data.doremus.org/sparql',
      debug: true
    });

    return Promise.all([promisePe, promisePu])
      .then(promResults => {
        let [pe, pu] = promResults;
        let graph = pe['@graph'].concat(pu['@graph']);
        graph.forEach(x => {
          if (!x.name) delete x.name;
        });
        let results = {
          '@context': 'http://schema.org',
          '@graph': graph,
          '@id': 'http://overture.doremus.org' + req.originalUrl,
          generatedAt: (new Date()).toISOString()
        };

        res.json(results);
      }).catch(err => sendStandardError(res, err));
  }

  static query(req, res) {
    let opt = Object.assign({
      lim: 20
    }, req.query);

    sparql.loadQuery('expression.list', opt)
      .then(r => {
        let data = r.results.bindings
          .map(exp => {
            let mc = {
              '@type': 'MusicComposition'
            };
            Object.keys(exp).forEach(p => {
              let v = exp[p].value;
              mc[padProp(p)] = v;
            });
            return mc;
          });

        res.json({
          '@context': 'http://schema.org/',
          '@id': 'http://overture.doremus.org' + req.originalUrl,
          'generatedAt': (new Date()).toISOString(),
          '@graph': data
        });
      }).catch(err => sendStandardError(res, err));
  }

}
