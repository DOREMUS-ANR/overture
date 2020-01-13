import async from 'async';
import getJSON from 'get-json';
import fs from 'fs-extra';
import NodeCache from 'node-cache';
import spt from 'sparql-transformer';
import {
  EXT_URI,
} from '../../../config/constants';
import Sparql from '../../commons/sparql';
import {
  sendStandardError,
} from '../../commons/utils';

const sparqlTransformer = spt.default;

const { RECOMMENDER } = EXT_URI;
const sparql = new Sparql();
const cache = new NodeCache();


const schemaOrgMapping = {
  uri: '@id',
  label: 'name',
  pic: 'image',
  names: 'additionalName',
  birth: 'birthDate',
  death: 'deathDate',
  birthPlace: 'birthPlace',
  deathPlace: 'deathPlace',
  comment: 'description',
  wikipedia: 'mainEntityOfPage',
  sameAs: 'sameAs',
  source: 'sourceOrganization',
};

function toSchemaOrg(a) {
  const artist = {
    '@type': 'Person',
  };

  for (const p in a) {
    const m = schemaOrgMapping[p];
    if (m) {
      const x = a[p];
      const val = x && x.value;
      const lang = x['xml:lang'];
      if (lang) {
        artist[m] = {
          '@value': val,
          '@language': lang,
        };
      } else artist[m] = val;
    } else console.log(`Not mapped prop: ${p}`);
  }

  return artist;
}

function packResults(res) {
  const data = (res && res.results && res.results.bindings) || [];

  data.forEach((b) => {
    Object.keys(b).forEach((prop) => {
      b[prop] = b[prop].value;
    });
  });

  // extract uuid from URI
  for (const d of data) d.id = /[^/]*$/.exec(d.expression)[0];

  return data;
}

const properties = {
  0: 'key',
  1: 'genre',
  2: 'casting',
  3: 'composer',
  combined: 'combined',
};

function getArtistInfo(uri, lang) {
  return sparql.loadQuery('artist.recommendation', {
    uri,
    lang,
  })
    .then((results) => {
      const _r = results.results.bindings;
      if (!_r.length) throw 'Empty response';
      return toSchemaOrg(_r[0]);
    });
}

function getExpressionInfo(uri, lang) {
  const query = fs.readJsonSync('server/queries/expression.recommendation.json');
  query.$values = {
    expression: uri,
  };
  return sparqlTransformer(query, {
    endpoint: 'http://data.doremus.org/sparql',
    debug: true,
  });
}

function getLabel(uri, lang, callback) {
  sparql.loadQuery('label', {
    uri,
    lang,
  })
    .then((results) => callback(null, results.results.bindings[0].label.value))
    .catch((err) => callback(err));
}

const DEFAULT_QUERY = {
  n: 3,
};

function callRecommenderFor(id, type = 'expression', query = DEFAULT_QUERY) {
  console.log(query);
  let q = `n=${query.n || 3}`;
  if (query.w) q += `&w=${query.w}`;
  if (query.explain) q += `&explain=${query.explain}`;

  return getJSON(`${RECOMMENDER}/${type}/${id}?${q}`);
}

function why2description(w) {
  if (w.feature.includes('period')) {
    if (w.score > 0.9998) {
      return {
        text: `same period (${w.values})`,
        score: 1,
      };
    }
    return {
      text: `similar period (${w.values})`,
      score: 0.9998,
    };
  }

  if (w.score > 0.9999) {
    return {
      text: `${w.feature}: ${w.values[0]}, ${w.values[1]}`,
      uris: [w.values[0], w.values[1]],
      score: w.score,
    };
  }
}

function postProcessRec(r, lang) {
  return new Promise((resolve, reject) => {
    r['@id'] = r.uri;
    if (!r.why) resolve(r);
    const description = r.why.map(why2description);
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
    const expression = req.params.id;

    const cached = cache.get(`expression${expression}${JSON.stringify(req.query)}`);
    if (cached) return res.json(cached);

    console.log('Getting recommendation for expression ', expression);
    callRecommenderFor(expression, 'expression', req.query)
      .then((rec) => {
        async.map(rec, (r, callback) => {
          getExpressionInfo(r.uri, req.query.lang)
            .then((exp) => {
              exp = exp['@graph'][0];
              Object.assign(r, exp);
              console.log(r);
              return postProcessRec(r, req.query.lang);
            })
            .then((d) => callback(null, d));
        }, (err, data) => {
          if (err) return sendStandardError(res, err);
          cache.set(`expression${expression}${JSON.stringify(req.query)}`, data);
          res.json(data);
        });
      }).catch((err) => sendStandardError(res, err));
  }

  static queryArtists(req, res) {
    const artist = req.params.id;

    const cached = cache.get(`artist${artist}${JSON.stringify(req.query)}`);
    if (cached) return res.json(cached);

    console.log('Getting recommendation for artist', artist);

    callRecommenderFor(artist, 'artist', req.query)
      .then((rec) => {
        async.map(rec, (r, callback) => {
          getArtistInfo(r.uri, req.query.lang)
            .then((a) => {
              console.log(r);
              Object.assign(r, a);
              return postProcessRec(r, req.query.lang);
            }).then((d) => callback(null, d));
        }, (err) => {
          if (err) return sendStandardError(res, err);
          cache.set(`artist${artist}${JSON.stringify(req.query)}`, rec);
          res.json(rec);
        });
      }).catch((err) => sendStandardError(res, err));
  }
}
