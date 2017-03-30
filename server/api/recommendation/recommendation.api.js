import Sparql from '../../commons/sparql';
import async from 'async';

var sparql = new Sparql();

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function packResults(expression, res, label) {
  'use strict';

  let data = (res && res.results && res.results.bindings) || [];

  data.forEach(b => {
    Object.keys(b).forEach(prop => {
      b[prop] = b[prop].value;
    });
  });

  // extract uuid from URI
  for (let d of data) {
    d.id = /[^/]*$/.exec(d.expression)[0];
  }

  // filter: i do not want the requested value
  data = data.filter((d) => d.id !== expression);

  return {
    data,
    label
  };
}

export default class RecommendationController {

  static query(req, res) {
    let expression = req.params.id;
    async.parallel([
      function(callback) {
        sparql.loadQuery('expression.recommendation.genre', {
            uri: `http://data.doremus.org/expression/${expression}`,
            lang: req.query.lang || 'en',
            limit: req.query.limit || 4
          })
          .then(results => callback(null, packResults(expression, results, 'of the same genre')))
          .catch(err => callback(err));
      },
      function(callback) {
        sparql.loadQuery('expression.recommendation.composer', {
            uri: `http://data.doremus.org/expression/${expression}`,
            lang: req.query.lang || 'en',
            limit: req.query.limit || 4
          })
          .then(results => callback(null, packResults(expression, results, 'of the same composer')))
          .catch(err => callback(err));
      }
    ], function(err, results) {
      if (err) {
        sendStandardError(res, err);
      }
      res.json(results);
    });

  }

}
