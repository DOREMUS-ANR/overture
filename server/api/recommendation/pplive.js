import sparqlTransformer from 'sparql-transformer';
import getJSON from 'get-json22';
import {
  EXT_URI
} from '../../../config/constants';

const RECOMMENDER = EXT_URI.RECOMMENDER;
const TYPE_MAP = {
  'concert': 'efrbroo:F31_Performance',
  'work': 'efrbroo:F22_Self-Contained_Expression'
};

function reduceToTrackSet(results, id) {
  'use strict';
  var merged = results.item.reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});

  delete merged[id];

  results.item = Object.values(merged);
  return results;
}

function recNpack(_seed, id, n, focus) {
  'use strict';

  let _n = n ? _n = '&n=' + (n * 3) : '';
  let _focus = focus ? _focus = '&focus=' + focus : '';

  return getJSON(`${RECOMMENDER}/expression${_seed}?target=pp${_n}${_focus}`)
    .then(r => packGroup(r, focus))
    .then(r => reduceToTrackSet(r, id));
}


function packGroup(recs, focus) {
  'use strict';

  let scores = {};
  for (let r of recs) scores[r.uri] = r.score;

  return sparqlTransformer({
    proto: [{
      'work': '?id',
      '@type': 'VideoObject',
      doremus_uri: '?vo$required',
      id: '?ppid$required'
    }],
    '$where': [
      '?vo mus:U51_is_partial_or_full_recording_of / mus:U54_is_performed_expression_of ?id',
      '?vo dct:identifier ?ppid'
    ],
    '$values': {
      'id': recs.map(r => '<' + r.uri + '>')
    }
  }, {
    endpoint: 'http://data.doremus.org/sparql',
    // debug: true
  }).then(results => {
    for (let r of results) {
      let w = Array.isArray(r.work) ? r.work[0] : r.work;
      r.score = parseFloat(scores[w]);
    }

    return {
      match: focus || 'similar',
      item: results
    };
  });
}

export default class PPLiveRecommender {
  static recommend(req, res) {
    let id = req.params.id,
      type = req.params.type;
    var n = req.query.n;

    var seed;
    sparqlTransformer({
        proto: {
          id: '?id',
          'pp_id': '$dc:identifier|dct:identifier$required$var:pp_id',
          works: '$efrbroo:R66_included_performed_version_of$sample'
        },
        '$where': [
          `?id a ${TYPE_MAP[type]}`
        ],
        '$values': {
          'pp_id': id
        },
        '$limit': 1
      }, {
        endpoint: 'http://data.doremus.org/sparql',
        // debug: true
      }).then(rs => {
        if (!rs[0])
          throw Error(`id ${id} for type ${type.toUpperCase()} not found`);

        let doremusUri = rs[0].id;
        let works = rs[0].works || doremusUri;

        // for now 1 use the first work as seed
        seed = Array.isArray(works) ? works[0] : works;
        let _seed = seed.substring(seed.lastIndexOf('/'));

        return Promise.all([
          recNpack(_seed, id, n),
          recNpack(_seed, id, n, 'genre'),
          recNpack(_seed, id, n, 'period'),
          recNpack(_seed, id, n, 'composer'),
          recNpack(_seed, id, n, 'casting'),
          recNpack(_seed, id, n, 'surprise'),
        ]);
      })
      .then(results => {
        let toChange = true;
        let loop = 0;
        while (toChange) {
          console.log(`LOOP ` + ++loop);
          toChange = false;
          if (loop > 20) break;
          if (!n) n = 4;
          pairs(results).forEach(pair => {
            let a = pair[0],
              b = pair[1];

            let isx = intersect(
              a.item.slice(0,n).map(x => x.id),
              b.item.slice(0,n).map(x => x.id)
            );
            if (isx.length) {
              toChange = true;
              console.log(a.match, b.match);
            } else return;

            for (let item of isx) {
              let itemA = a.item.find(x => x.id === item);
              let itemB = b.item.find(x => x.id === item);

              if (a.item.length <= n)
                b.item.removeObject(itemB);
              else if (b.item.length <= n)
                a.item.removeObject(itemA);
              else if (itemB.score > itemA.score)
                a.item.removeObject(itemA);
              else b.item.removeObject(itemB);
            }
          });
        }

        results.forEach(x=>{
          x.item = x.item.slice(0,n);
        });

        res.json({
          seed,
          results
        });
      })
      .catch(e => {
        console.error(e);
        res.status(500);
        res.json({
          'error': e.message
        });
      });
  }
}

const intersect = (a, b, ...rest) => {
  if (rest.length === 0)
    return [...new Set(a)].filter(x => new Set(b).has(x));
  return intersect(a, intersect(b, ...rest));
};

function pairs(arr) {
  var res = [],
    l = arr.length;
  for (var i = 0; i < l; ++i)
    for (var j = i + 1; j < l; ++j)
      res.push([arr[i], arr[j]]);
  return res;
}

Array.prototype.removeObject = function(object) {
  'use strict';
  var index = this.indexOf(object);
  if (index > -1) this.splice(index, 1);
};
