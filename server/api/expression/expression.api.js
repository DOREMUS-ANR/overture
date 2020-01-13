/* eslint-disable import/no-named-default */
import spt from 'sparql-transformer';
import fs from 'fs-extra';
import clone from 'clone';
import Sparql from '../../commons/sparql';
import {
  sendStandardError,
} from '../../commons/utils';

const sparqlTransformer = spt.default;

const sparql = new Sparql();

const PERFORMANCE_QUERY = fs.readJsonSync('server/queries/expression.performance.json');
const PUBLICATION_QUERY = fs.readJsonSync('server/queries/expression.publication.json');
const LIST_QUERY = fs.readJsonSync('server/queries/expression.list.json');

function padProp(p) {
  const pre = ((p === 'id') ? '@' : '');
  return pre + p;
}

function smartMerge(candidateValue, oldValue) {
  const cv = candidateValue;
  const ov = oldValue;
  if (!ov || ov === cv) return cv;

  if (ov.uri && ov.uri === cv.uri) return cv;
  if (ov['@value'] && ov['@value'] === cv['@value']) return cv;

  if (Array.isArray(ov)) {
    if (cv.uri) {
      if (ov.every((p) => p.uri !== cv.uri)) ov.push(cv);
    } else if (cv['@value']) {
      if (ov.every((p) => p['@value'] !== cv['@value'])) ov.push(cv);
    } else if (!ov.includes(cv)) ov.push(cv);
    return ov;
  }

  return [ov, cv];
}


function array2obj(input, mergeKey, splitOn = '_') {
  input.forEach((l) => { // line
    Object.keys(l).forEach((k) => {
      const current = l[k];
      let v = current.value;


      const lang = current['xml:lang'];


      const { datatype } = current;

      if (datatype && datatype === 'http://www.w3.org/2001/XMLSchema#int') v = parseInt(v);
      const considerLang = (k === 'alternateName' && lang);

      l[k] = considerLang ? {
        '@value': v,
        '@language': lang,
      } : v;
    });
    Object.keys(l).forEach((k) => {
      if (!k.includes(splitOn)) return;
      const [k1, k2] = k.split(splitOn);
      if (!l[k1]) l[k1] = {};
      l[k1][k2] = l[k];
      delete l[k];
    });
  });

  const output = [];
  const uniques = Array.from(new Set(input.map((item) => item[mergeKey])));

  uniques.forEach((x) => {
    const subset = input.filter((item) => item[mergeKey] === x);
    const obj = {};

    subset.forEach((item) => {
      Object.keys(item).forEach((k) => {
        obj[k] = smartMerge(item[k], obj[k]);
      });
    });
    output.push(obj);
  });
  return output[0];
}

export default class ExpressionController {
  static get(req, res) {
    const uri = `<http://data.doremus.org/expression/${req.params.id}>`;

    ExpressionController.getDetail(uri, req.query.lang)
      .then((expression) => {
        if (!expression.derivation) return Promise.resolve(expression);

        const query = clone(LIST_QUERY);
        query.$lang = req.query.lang || 'en';
        query.$where.push(`?work efrbroo:R9_is_realised_in ${uri}`);
        query.$where.push('?work efrbroo:R2_is_derivative_of / efrbroo:R9_is_realised_in ?id');

        return sparqlTransformer(query, {
          endpoint: 'http://data.doremus.org/sparql',
          debug: true,
        }).then((der) => {
          console.log(der);
          expression.derivativeOf = der['@graph'][0];
          return expression;
        });
      })
      .then((result) => {
        result['@id'] = `http://overture.doremus.org${req.originalUrl}`;
        result.generatedAt = (new Date()).toISOString();
        res.json(result);
      })
      .catch((err) => sendStandardError(res, err));
  }

  static getDetail(uri, lang) {
    console.log(uri);
    return sparql.loadQuery('expression.detail', { uri, lang })
      .then((r) => {
        const data = r.results.bindings;
        const expression = array2obj(data, 'expression');
        expression.id = uri;
        if (expression.alternateName) {
          if (!Array.isArray(expression.alternateName)) expression.alternateName = [expression.alternateName];
          expression.alternateName = expression.alternateName
            .filter((a) => a['@language'] || a !== expression.name);
        }

        return Promise.resolve(expression);
      });
  }

  static getRealisations(req, res) {
    const queryPe = clone(PERFORMANCE_QUERY);
    const queryPu = clone(PUBLICATION_QUERY);
    for (const query of [queryPe, queryPu]) {
      query.$lang = req.query.lang || 'en';
      query.$values = {
        expression: `<http://data.doremus.org/expression/${req.params.id}>`,
      };
    }

    const promisePe = sparqlTransformer(queryPe, {
      endpoint: 'http://data.doremus.org/sparql',
      debug: true,
    });
    const promisePu = sparqlTransformer(queryPu, {
      endpoint: 'http://data.doremus.org/sparql',
      debug: true,
    });

    return Promise.all([promisePe, promisePu])
      .then((promResults) => {
        const [pe, pu] = promResults;
        const graph = pe['@graph'].concat(pu['@graph']);
        graph.forEach((x) => {
          if (!x.name) delete x.name;
        });
        const results = {
          '@context': 'http://schema.org',
          '@graph': graph,
          '@id': `http://overture.doremus.org${req.originalUrl}`,
          generatedAt: (new Date()).toISOString(),
        };

        res.json(results);
      }).catch((err) => sendStandardError(res, err));
  }

  static query(req, res) {
    const opt = { lim: 20, ...req.query };

    sparql.loadQuery('expression.list', opt)
      .then((r) => {
        const data = r.results.bindings
          .map((exp) => {
            const mc = {
              '@type': 'MusicComposition',
            };
            Object.keys(exp).forEach((p) => {
              const v = exp[p].value;
              mc[padProp(p)] = v;
            });
            return mc;
          });

        res.json({
          '@context': 'http://schema.org/',
          '@id': `http://overture.doremus.org${req.originalUrl}`,
          generatedAt: (new Date()).toISOString(),
          '@graph': data,
        });
      }).catch((err) => sendStandardError(res, err));
  }
}
