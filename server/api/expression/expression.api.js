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

export default class ExpressionController {

  static get(req, res) {
    sparql.loadQuery('expression.detail', {
        uri: `<http://data.doremus.org/expression/${req.params.id}>`
      })
      .then(results => res.json(results))
      .catch(err => sendStandardError(res, err));
  }

  static query(req, res) {
    sparql.loadQuery('expression.list', req.query)
      .then(results => res.json(results))
      .catch(err => sendStandardError(res, err));
  }

}
