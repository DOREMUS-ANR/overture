import sparqlTransformer from 'sparql-transformer';
import Cache from '../../commons/cache';
import fs from 'fs-extra';
import clone from 'clone';
import ExpressionController from '../expression/expression.api';
import PerformanceController from '../performance/performance.api';
import {
  sendStandardError
} from '../../commons/utils';

const cache = new Cache();

const LIST_QUERY = fs.readJsonSync('server/queries/score.list.json');
const DETAIL_QUERY = fs.readJsonSync('server/queries/score.detail.json');

function getWorks(worksId, opt){
  return Promise.all(worksId.map(x=> ExpressionController.getDetail(x, opt.lang)))
}

function getPerfs(perfId, opt){
  return Promise.all(perfId.map(x=> PerformanceController.getDetail(x, opt.lang)))
}

export default class ScoreController {
  static get(req, res) {
    let uri = `http://data.doremus.org/manifestation/${req.params.id}`;
    let opt = {
      lang: req.query.lang || 'en'
    };

    ScoreController.getDetail(uri, opt.lang)
      .then(results => {
        let worksId = results['@graph'][0].about;
        let perfsId = results['@graph'][0].subjectOf;
        if(!Array.isArray(worksId)) worksId = [worksId];
        if(!Array.isArray(perfsId)) perfsId = [perfsId];

        getWorks(worksId, opt).then(w=>{
          results['@graph'][0].about = w;
        }).then(() => getPerfs(perfsId, opt))
        .then(p => {
          results['@graph'][0].subjectOf =  p.map(x=>x['@graph'][0]);

          results['@id'] = 'http://overture.doremus.org' + req.originalUrl;
          results.generatedAt = (new Date()).toISOString();
          res.json(results);
        });
      }).catch(err => sendStandardError(res, err));
  }

  static query(req, res) {
    console.log(req.query);
    let opt = Object.assign({
      lim: 40,
      lang: 'en'
    }, req.query);

    let data = cache.get('score.list', opt);
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
  }

  static getDetail(uri, lang = 'en') {
    let opt = {
      uri,
      lang
    };
    let cacheId = 'score.detail';

    let data =  cache.get(cacheId, opt)
    if (data) return Promise.resolve(data);

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
  }

}
