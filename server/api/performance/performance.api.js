import sparqlTransformer from 'sparql-transformer';
import Cache from '../../commons/cache';
import fs from 'fs-extra';
import clone from 'clone';
import {
  sendStandardError
} from '../../commons/utils';

const cache = new Cache();

const LIST_QUERY = fs.readJsonSync('server/queries/performance.list.json');
const DETAIL_QUERY = fs.readJsonSync('server/queries/performance.detail.json');
const ARTISTS_QUERY = fs.readJsonSync('server/queries/performance.artists.json');
const WORKS_QUERY = fs.readJsonSync('server/queries/performance.works.json');
const REC_QUERY = fs.readJsonSync('server/queries/performance.rec.json');

export default class PerfomanceController {
  static get(req, res) {
    let uri = `http://data.doremus.org/performance/${req.params.id}`;
    let opt = {
      lang: req.query.lang || 'en'
    };

    Promise.all([
        PerfomanceController.getDetail(uri, opt.lang),
        PerfomanceController.getArtists(uri, opt.lang),
        PerfomanceController.getWorks(uri, opt.lang),
        PerfomanceController.getRecording(uri, opt.lang),
      ])
      .then(r => {
        let [results, pfs, works, rec] = r;
        pfs = pfs['@graph'][0].performer;
        if (pfs) {
          if (!Array.isArray(pfs)) pfs = [pfs];
          pfs.map(p => p.performer)
            .forEach(p => p['@type'] = p['@type'].includes('Person') ? 'Person' : 'PerformingGroup');
          results['@graph'][0].performer = pfs;
        }
        results['@graph'][0].workPerformed = works['@graph'];
        results['@graph'][0].recordedAs = rec['@graph'];
        results['@id'] = 'http://overture.doremus.org' + req.originalUrl;
        results.generatedAt = (new Date()).toISOString();
        res.json(results);
      }).catch(err => sendStandardError(res, err));
  }

  static query(req, res) {
    console.log(req.query);
    let opt = Object.assign({
      lim: 40,
      lang: 'en'
    }, req.query);

    cache.get('performance.list', opt)
      .then(data => {
        if (data) return res.json(data);

        let query = clone(LIST_QUERY);
        query.$filter = [];

        if (opt.year) {
          let y = parseInt(opt.year);
          if (!isNaN(y))
            query.$filter = [
              `?date >= "${y}"^^xsd:gYear`,
              `?date < "${y+1}"^^xsd:gYear`
            ];
        }
        if (opt.place) {
          query['@graph'][0].location['@id'] += '$required';

          query.$where.push('?id ecrm:P7_took_place_at/ecrm:P89_falls_within*/rdfs:label ?plc');
          query.$filter.push(`(regex(str(?plc),'${opt.place.replace(/[àáèéëíìòóùúçč]/g, '.{1,2}')}', 'i'))`);

        }

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

  static getDetail(uri, lang = 'en') {
    let opt = {
      uri,
      lang
    };
    let cacheId = 'performance.detail';

    return cache.get(cacheId, opt)
      .then(data => {
        if (data) return data;

        let query = clone(DETAIL_QUERY);

        query.$lang = lang;
        query.$values = {
          'id': uri
        };

        return sparqlTransformer(query, {
          endpoint: 'http://data.doremus.org/sparql',
          debug: true
        }).then(result => {
          cache.set(cacheId, opt, result);
          return result;
        });
      });
  }
  static getRecording(uri, lang = 'en') {
    let opt = {
      uri,
      lang
    };
    let cacheId = 'performance.recording';

    return cache.get(cacheId, opt)
      .then(data => {
        if (data) return data;

        let query = clone(REC_QUERY);

        query.$lang = lang;
        query.$values = {
          'performance': uri
        };

        return sparqlTransformer(query, {
          endpoint: 'http://data.doremus.org/sparql',
          debug: true
        }).then(result => {
          cache.set(cacheId, opt, result);
          return result;
        });
      });
  }
  static getWorks(uri, lang = 'en') {
    let opt = {
      uri,
      lang
    };
    let cacheId = 'performance.works';

    return cache.get(cacheId, opt)
      .then(data => {
        if (data) return data;

        let query = clone(WORKS_QUERY);

        query.$lang = lang;
        query.$values = {
          'performance': uri
        };

        return sparqlTransformer(query, {
          endpoint: 'http://data.doremus.org/sparql',
          debug: true
        }).then(result => {
          cache.set(cacheId, opt, result);
          return result;
        });
      });
  }

  static getArtists(uri, lang = 'en') {
    let opt = {
      uri,
      lang
    };
    let cacheId = 'performance.artists';

    return cache.get(cacheId, opt)
      .then(data => {
        if (data) return data;

        let query = clone(ARTISTS_QUERY);

        query.$lang = lang;
        query.$values = {
          'id': uri
        };

        return sparqlTransformer(query, {
          endpoint: 'http://data.doremus.org/sparql',
          debug: true
        }).then(result => {
          cache.set(cacheId, opt, result);
          return result;
        });
      });
  }
}
