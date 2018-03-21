import Sparql from '../../commons/sparql';
import ArtistController from '../artist/artist.api.js';
import {
  EXT_URI
} from '../../../config/constants';
import async from 'async';
import getJSON from 'get-json22';
import jsonfile from 'jsonfile';
import NodeCache from 'node-cache';
import sparqlTransformer from 'sparql-transformer';
import {sendStandardError} from '../../commons/utils';


const RECOMMENDER = EXT_URI.RECOMMENDER;
const sparql = new Sparql();
const cache = new NodeCache();


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

function getArtistInfo(uri, lang) {
  'use strict';
  return sparql.loadQuery('artist.recommendation', {
      uri,
      lang
    })
    .then(results => {
      let _r = results.results.bindings;
      if (!_r.length) throw 'Empty response';
      return ArtistController.toSchemaOrg(_r[0]);
    });
}

function getExpressionInfo(uri, lang) {
  'use strict';

  let query = jsonfile.readFileSync('server/commons/queries/expression.recommendation.json');
  query.$values = {
    'expression': uri
  };
  return sparqlTransformer(query, {
    endpoint: 'http://data.doremus.org/sparql'
  });
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

const DEFAULT_QUERY = {
  n: 3
};

function callRecommenderFor(id, type = 'expression', query = DEFAULT_QUERY) {
  let cached = cache.get(type + id + JSON.stringify(query));
  if (cached) return Promise.resolve(cached);
  console.log(query);
  let q = 'n=' + (query.n || 3);
  if (query.w) q += '&w=' + query.w;
  if (query.explain) q += '&explain=' + query.explain;

  return getJSON(`${RECOMMENDER}/${type}/${id}?${q}`)
    .then((result) => {
      cache.set(type + id, result);
      return result;
    });
}

function why2description(w) {
  'use strict';
  if (w.feature.includes('period')) {
    if (w.score > 0.9998)
      return {
        text: `same period (${w.values})`,
        score: 1
      };
    else return {
      text: `similar period (${w.values})`,
      score: 0.9998
    };
  }

  if (w.score > 0.9999)
    return {
      text: `${w.feature}: ${w.values[0]}, ${w.values[1]}`,
      uris: [w.values[0], w.values[1]],
      score: w.score
    };
}

function postProcessRec(r, lang) {
  'use strict';
  return new Promise((resolve, reject) => {
    r['@id'] = r.uri;
    if(!r.why) resolve(r);
    let description = r.why.map(why2description);
    description.sort((a, b) => b.score - a.score);
    r.description = description.slice(0, 3);
    async.each(r.description, (d, cbD) => {
      if (!d.uris) return cbD();
      async.eachSeries(d.uris, (u, cbU) => {
        getLabel(u, lang, (err, label) => {
          d.text = d.text.replace(u, label);
          cbU();
        });
      }, cbD);
    }, (e) => {
      if (e) reject(e);
      resolve(r);
    });
  });

}

export default class RecommendationController {
  static query(req, res) {
    let expression = req.params.id;
    console.log('Getting recommendation for expression ', expression);
    callRecommenderFor(expression,'expression', req.query)
      .then((rec) => {
        async.map(rec, (r, callback) => {
          getExpressionInfo(r.uri, req.query.lang)
            .then(exp => {
              exp = exp['@graph'][0];
              Object.assign(r, exp);
              console.log(r);
              return postProcessRec(r, req.query.lang);
            })
            .then(d => callback(null, d));
        }, (err, data) => {
          if (err) return sendStandardError(res, err);
          res.json(data);
        });
      }).catch(err => sendStandardError(res, err));
  }

  static queryArtists(req, res) {
    let artist = req.params.id;
    console.log('Getting recommendation for artist', artist);

    callRecommenderFor(artist, 'artist', req.query)
      .then((rec) => {
        async.map(rec, (r, callback) => {
          getArtistInfo(r.uri, req.query.lang)
            .then(a => {
              console.log(r);
              Object.assign(r, a);
              return postProcessRec(r, req.query.lang);
            }).then(d => callback(null, d));
        }, (err) => {
          if (err) return sendStandardError(res, err);
          res.json(rec);
        });
      }).catch(err => sendStandardError(res, err));
  }
}
