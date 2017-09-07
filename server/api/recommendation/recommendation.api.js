import Sparql from '../../commons/sparql';
import {
  EXT_URI
} from '../../../config/constants';
import async from 'async';
import getJSON from 'get-json22';
import NodeCache from 'node-cache';

const RECOMMENDER = EXT_URI.RECOMMENDER;
const sparql = new Sparql();
const cache = new NodeCache();

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function packResults(res) {
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

  return data;
}

const properties = {
  0: 'key',
  1: 'genre',
  2: 'casting',
  3: 'composer',
  combined: 'combined'
};

function getShortInfo(uri, lang, callback) {
  'use strict';
  sparql.loadQuery('expression.recommendation', {
      uri,
      lang
    })
    .then(results => callback(null, packResults(results)[0]))
    .catch(err => callback(err));
}

function callRecommenderFor(expression) {
  'use strict';

  let cached = cache.get(expression);
  if (cached) return Promise.resolve(cached);

  return getJSON(`${RECOMMENDER}/expression/${expression}`)
    .then((result) => {
      cache.set(expression, result);
      return result;
    });
}

var nRecPerTipe = 2;
export default class RecommendationController {

  static query(req, res) {
    let expression = req.params.id;
    console.log('Getting recommendation for', expression);
    // docker run -v /Users/pasquale/git/recommender/recommending/data:/data -v /Users/pasquale/git/recommender/recommending/features:/features -v /Users/pasquale/git/recommender/recommending/emb:/emb --name recinst0 doremus/recommender python -m recommend --expression http://data.doremus.org/expression/7ce787df-e214-3d9b-a023-5439a7816d94

    callRecommenderFor(expression)
      .then((rec) => {
        async.map(rec, (r, callback) => {
          let code = r.code;
          let scores = r.recommendation
            .slice(0, req.query.limit || nRecPerTipe)
            .filter(s => s.score > 0);
          async.map(scores,
            (s, cb) => getShortInfo(s.uri, req.query.lang || 'en', cb),
            (err, data) => {
              let p = properties[code];
              callback(null, {
                label: p === 'combined' ? p : 'with the same ' + p,
                property: p,
                data
              });
            });
        }, (err, data) => {
          if (err) return sendStandardError(res, err);
          res.json(data);
        });
      }).catch(sendStandardError);
  }
}
