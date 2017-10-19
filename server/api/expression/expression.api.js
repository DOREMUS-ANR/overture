import Sparql from '../../commons/sparql';

var sparql = new Sparql();

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function padProp(p) {
  'use strict';
  let pre = ((p === 'id') ? '@' : '');
  return pre + p;
}

export default class ExpressionController {

  static get(req, res) {
    sparql.loadQuery('expression.detail', {
        uri: `<http://data.doremus.org/expression/${req.params.id}>`,
        lang: req.query.lang
      })
      .then(results => res.json(results))
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
        try {
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
        } catch (e) {
          res.json([]);
        }
      })
      .catch(err => sendStandardError(res, err));
  }

}
