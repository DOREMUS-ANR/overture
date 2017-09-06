import Sparql from '../../commons/sparql';
import {
  APP_PATH
} from '../../../config/constants';
import async from 'async';
import fs from 'fs';
import path from 'path';
import tsv from 'tsv';
import PythonShell from 'python-shell';

const RECOMMENDING_PATH = APP_PATH.RECOMMENDING_PATH;
const SCORING_PATH = RECOMMENDING_PATH + '/data/scoring';
var sparql = new Sparql();

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
const TSV_HEADER = 'uri\tscore\n';

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

  if (fs.existsSync(path.join(SCORING_PATH, `${expression}_combined.tsv`)))
    return Promise.resolve();
    console.log(RECOMMENDING_PATH);
  let options = {
    pythonPath: '/python3',
    scriptPath: RECOMMENDING_PATH,
    args: ['-exp', `http://data.doremus.org/expression/${expression}`]
  };
  return new Promise((resolve, reject) => {
    PythonShell.run('recommend.py', options, (err, results) =>{
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

var nRecPerTipe = 2;
export default class RecommendationController {

  static query(req, res) {
    let expression = req.params.id;
    console.log('Getting recommendation for', expression);
    // docker run -v /Users/pasquale/git/recommender/recommending/data:/data -v /Users/pasquale/git/recommender/recommending/features:/features -v /Users/pasquale/git/recommender/recommending/emb:/emb --name recinst0 doremus/recommender python -m recommend --expression http://data.doremus.org/expression/7ce787df-e214-3d9b-a023-5439a7816d94

    callRecommenderFor(expression)
      .then(() => {
        async.map(Object.keys(properties), (k, callback) => {
          let tsvFile = path.join(SCORING_PATH, `${expression}_${k}.tsv`);
          fs.readFile(tsvFile, 'utf8', (err, data) => {
            if (err) return callback(err);

            let scores = tsv.parse(TSV_HEADER + data)
              .slice(0, req.query.limit || nRecPerTipe)
              .filter(s => s.score > 0);
            async.map(scores,
              (s, cb) => getShortInfo(s.uri, req.query.lang || 'en', cb),
              (err, data) => {
                let p = properties[k];
                callback(null, {
                  label: p === 'combined' ? p : 'with the same ' + p,
                  property: p,
                  data
                });
              });
          });

        }, (err, data) => {
          if (err) return sendStandardError(res, err);

          res.json(data);
        });
      }).catch(sendStandardError);

    // old
    // async.parallel([
    //   function(callback) {
    //     sparql.loadQuery('expression.recommendation.genre', {
    //         uri: `http://data.doremus.org/expression/${expression}`,
    //         lang: req.query.lang || 'en',
    //         limit: req.query.limit || nRecPerTipe,
    //         nocache: true
    //       })
    //       .then(results => callback(null, packResults(results, 'of the same genre')))
    //       .catch(err => callback(err));
    //   },
    //   function(callback) {
    //     sparql.loadQuery('expression.recommendation.composer', {
    //         uri: `http://data.doremus.org/expression/${expression}`,
    //         lang: req.query.lang || 'en',
    //         limit: req.query.limit || nRecPerTipe,
    //         nocache: true
    //       })
    //       .then(results => callback(null, packResults(results, 'of the same composer')))
    //       .catch(err => callback(err));
    //   },
    //   function(callback) {
    //     sparql.loadQuery('expression.recommendation.mop', {
    //         uri: `http://data.doremus.org/expression/${expression}`,
    //         lang: req.query.lang || 'en',
    //         limit: req.query.limit || nRecPerTipe
    //       })
    //       .then(results => callback(null, packResults(results, 'with the same instruments')))
    //       .catch(err => callback(err));
    //   }
    // ], function(err, results) {
    //   if (err) {
    //     sendStandardError(res, err);
    //   }
    //   res.json(results);
    // });

  }
}
