import Sparql from '../../commons/sparql';
import {
  sendStandardError
} from '../../commons/utils';

var sparql = new Sparql();

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
    sparql.loadQuery('expression.detail', {
        uri: `<http://data.doremus.org/expression/${req.params.id}>`,
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

        res.json(expression);
      })
      .catch(err => sendStandardError(res, err));
  }

  static getRealisations(req, res) {
    sparql.loadQuery('expression.realisation', {
        uri: `<http://data.doremus.org/expression/${req.params.id}>`,
        lang: req.query.lang
      })
      .then(results => res.json(results))
      .catch(err => sendStandardError(res, err));
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
