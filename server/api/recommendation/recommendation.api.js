import Sparql from '../../commons/sparql';
import ArtistController from '../artist/artist.api.js';
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

function getArtistInfo(uri, lang, callback) {
  'use strict';
  sparql.loadQuery('artist.recommendation', {
      uri,
      lang
    })
    .then(results => {
      let _r = results.results.bindings;
      if (!_r.length) return callback();
      callback(null, ArtistController.toSchemaOrg(_r[0]));
    }).catch(err => callback(err));
}

function getLabel(uri, lang, callback) {
  'use strict';
  sparql.loadQuery('label', {
      uri,
      lang
    })
    .then(results => callback(null, results.results.bindings[0].label.value))
    .catch(err => callback(err));
}

function callRecommenderFor(id, type = 'expression') {
  let cached = cache.get(type + id);
  if (cached) return Promise.resolve(cached);

  return getJSON(`${RECOMMENDER}/${type}/${id}`)
    .then((result) => {
      cache.set(type + id, result);
      return result;
    });
}

var nRecPerTipe = 2;
export default class RecommendationController {

  static query(req, res) {
    let expression = req.params.id;
    console.log('Getting recommendation for', expression);
    callRecommenderFor(expression)
      .then((rec) => {
        async.map(rec, (r, callback) => {
          let code = r.code;
          let scores = r.recommendation
            .slice(0, req.query.limit || nRecPerTipe)
            .filter(s => s.score > 0);
          async.map(scores,
            (s, cb) => getShortInfo(s.uri, req.query.lang, cb),
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

  static queryArtists(req, res) {
    let artist = req.params.id;
    console.log('Getting recommendation for artist', artist);

    callRecommenderFor(artist, 'artist')
      .then((rec) => {
        async.map(rec, (r, callback) => {
          getArtistInfo(r.uri, req.query.lang, (err, a) => {
            Object.keys(a).forEach(k => r[k] = a[k]);
            let description = [];
            for (let w of r.why) {
              if (w.feature === 'period') {
                if (w.score > 0.9998)
                  description.push({
                    text: `same period (${w.values})`,
                    score: 1
                  });
                else
                  description.push({
                    text: `similar period (${w.values})`,
                    score: 0.9998
                  });
              } else {
                if (w.score > 0.9999)
                  description.push({
                    text: `${w.feature}: ${w.values[0]}, ${w.values[1]}`,
                    uris: [w.values[0], w.values[1]],
                    score: w.score
                  });
              }
            }
            description.sort((a, b) => b.score - a.score);
            r['@id'] = r.uri;
            r.description = description.slice(0, 3);
            async.each(r.description, (d, cbD) => {
              if (!d.uris) return cbD();
              async.eachSeries(d.uris, (u, cbU) => {
                getLabel(u, req.query.lang, (err, label) => {
                  d.text = d.text.replace(u, label);
                  cbU();
                });
              }, cbD);
            }, callback);
          });
        }, (err) => {
          if (err) return sendStandardError(res, err);
          res.json(rec);
        });
      }).catch(sendStandardError);
  }
}
