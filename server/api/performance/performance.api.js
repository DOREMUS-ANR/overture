import sparqlTransformer from 'sparql-transformer';
import Cache from '../../commons/cache';
import jsonfile from 'jsonfile';
import clone from 'clone';

const cache = new Cache();

const LIST_QUERY = jsonfile.readFileSync('server/queries/performance.list.json');
// const DETAIL_LIGHT_QUERY = jsonfile.readFileSync('server/commons/queries/artist.detail.light.json');
// const DETAIL_QUERY = jsonfile.readFileSync('server/commons/queries/artist.detail.json');
// const WORKS_QUERY = jsonfile.readFileSync('server/commons/queries/artist.work.json');
// const PERFORMANCE_QUERY = jsonfile.readFileSync('server/commons/queries/artist.performance.json');

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function sampleDate(dateArray) {
  'use strict';
  if (!Array.isArray(dateArray)) return dateArray;
  if (dateArray.length === 0) return null;
  if (dateArray.length === 1) return dateArray[0];

  return dateArray.sort((a, b) => b.length - a.length)[0];
}

export default class PerfomanceController {
  static get(req, res) {
    // let uri = `http://data.doremus.org/performance/${req.params.id}`;
    // let opt = {
    //   lang: req.query.lang || 'en'
    // };
    //
    // ArtistController.getDetail(artistUri, opt.lang)
    //   .then(results => {
    //
    //     // remove dbpedia duplicates
    //     let dbpedia = results['@graph'][0].sameAs
    //       .filter(x => x.includes('dbpedia'));
    //     while (dbpedia.length > 1) {
    //       let index = results['@graph'][0].sameAs.indexOf(dbpedia[0]);
    //       results['@graph'][0].sameAs.splice(index, 1);
    //       dbpedia.splice(0, 1);
    //     }
    //
    //     // remove main name from additionalName
    //     let addNames = results['@graph'][0].additionalName;
    //     if (!Array.isArray(addNames))
    //       results['@graph'][0].additionalName = null;
    //     else {
    //       let x = addNames.indexOf(results['@graph'][0].name);
    //       if (x >= 0) results['@graph'][0].additionalName.splice(x, 1);
    //     }
    //
    //     results['@id'] = 'http://overture.doremus.org' + req.originalUrl;
    //     results.generatedAt = (new Date()).toISOString();
    //     res.json(results);
    //   }).catch(err => sendStandardError(res, err));
  }

  static query(req, res) {
    console.log(req.query);
    let results;
    let opt = Object.assign({
      lim: 40,
      lang: 'en'
    }, req.query);

    cache.get('performance.list', opt)
      .then(data => {
        if (data) return res.json(data);

        let query = clone(LIST_QUERY);
        query.$limit = opt.lim;
        query.$offset = opt.offset;
        query.$lang = opt.lang;

        sparqlTransformer(query, {
            endpoint: 'http://data.doremus.org/sparql',
            debug: true
          }).then(results => {
            results['@id'] = 'http://overture.doremus.org' + req.originalUrl;
            results.generatedAt = (new Date()).toISOString();
            cache.set('artist.list', opt, results);
            res.json(results);
          })
          .catch(err => sendStandardError(res, err));
      }).catch(err => sendStandardError(res, err));
  }

  // static getDetail(artistUri, lang = 'en', light = false) {
  //   let opt = {
  //     lang
  //   };
  //   let cacheId = 'artist.detail' + light ? '.light' : '';
  //
  //   return cache.get('artist.detail', opt)
  //     .then(data => {
  //       if (data) return data;
  //
  //       let query = clone(light ? DETAIL_LIGHT_QUERY : DETAIL_QUERY);
  //
  //       query.$lang = lang;
  //       query.$values = {
  //         'id': artistUri
  //       };
  //
  //       return sparqlTransformer(query, {
  //         endpoint: 'http://data.doremus.org/sparql'
  //       }).then(result => {
  //         result['@graph'][0].birthDate = sampleDate(result['@graph'][0].birthDate);
  //         result['@graph'][0].deathDate = sampleDate(result['@graph'][0].deathDate);
  //         cache.set(cacheId, opt, result);
  //         return result;
  //       });
  //     });
  // }
}
