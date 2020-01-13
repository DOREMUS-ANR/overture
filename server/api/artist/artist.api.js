import spt from 'sparql-transformer';
import fs from 'fs-extra';
import clone from 'clone';
import Cache from '../../commons/cache';

const sparqlTransformer = spt.default;

const cache = new Cache();

const LIST_QUERY = fs.readJsonSync('server/queries/artist.list.json');
const DETAIL_LIGHT_QUERY = fs.readJsonSync('server/queries/artist.detail.light.json');
const DETAIL_QUERY = fs.readJsonSync('server/queries/artist.detail.json');
const WORKS_QUERY = fs.readJsonSync('server/queries/artist.work.json');
const PERFORMANCE_QUERY = fs.readJsonSync('server/queries/artist.performance.json');

function sendStandardError(res, err) {
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message,
  });
}

function sampleDate(dateArray) {
  if (!dateArray) return null;
  if (!Array.isArray(dateArray)) return dateArray;
  if (dateArray.length === 0) return null;
  if (dateArray.length === 1) return dateArray[0];

  return dateArray.sort((a, b) => b.length - a.length)[0];
}

export default class ArtistController {
  static get(req, res) {
    const artistUri = `http://data.doremus.org/artist/${req.params.id}`;
    const opt = {
      lang: req.query.lang || 'en',
      light: req.query.light || false,
    };

    ArtistController.getDetail(artistUri, opt.lang, opt.light)
      .then((results) => {
        const mainObj = results['@graph'][0];
        // remove dbpedia duplicates
        const dbpedia = mainObj.sameAs && mainObj.sameAs
          .filter((x) => x.includes('dbpedia'));
        while (dbpedia && dbpedia.length > 1) {
          const index = mainObj.sameAs.indexOf(dbpedia[0]);
          mainObj.sameAs.splice(index, 1);
          dbpedia.splice(0, 1);
        }

        // remove main name from additionalName
        const addNames = mainObj.additionalName;
        if (!addNames) {
          // do nothing
        } else if (!Array.isArray(addNames)) mainObj.additionalName = null;
        else {
          const x = addNames.indexOf(mainObj.name);
          if (x >= 0) mainObj.additionalName.splice(x, 1);
        }

        results['@id'] = `http://overture.doremus.org${req.originalUrl}`;
        results.generatedAt = (new Date()).toISOString();
        res.json(results);
      }).catch((err) => sendStandardError(res, err));
  }

  static performances(req, res) {
    const artistUri = `http://data.doremus.org/artist/${req.params.id}`;
    const opt = {
      lang: req.query.lang || 'en',
      author: artistUri,
    };
    const data = cache.get('artist.performances', opt);
    if (data) return res.json(data);

    const query = clone(PERFORMANCE_QUERY);
    query.$lang = opt.lang;
    query.$values = {
      author: artistUri,
    };

    const queryPromise = sparqlTransformer(query, {
      endpoint: 'http://data.doremus.org/sparql',
      debug: true,
    });

    return Promise.all([queryPromise,
      ArtistController.getDetail(artistUri, opt.lang, true),
    ])
      .then((resultArray) => {
        const result = resultArray[0];
        const { image, name } = resultArray[1]['@graph'][0];

        result['@graph'].forEach((x) => {
          if (!x.name && x.alternateName) {
            x.name = x.alternateName;
            delete x.alternateName;
          }
          x.image = image;
          x.performer.performer = name;
          if (!x.description) delete x.description;
        });

        result['@id'] = `http://overture.doremus.org${req.originalUrl}`;
        result.generatedAt = (new Date()).toISOString();

        cache.set('artist.performances', opt, result);
        res.json(result);
      }).catch((err) => sendStandardError(res, err));
  }

  static works(req, res) {
    const artistUri = `http://data.doremus.org/artist/${req.params.id}`;
    const opt = {
      lang: req.query.lang || 'en',
      author: artistUri,
    };
    const data = cache.get('artist.works', opt);
    if (data) return res.json(data);

    const query = clone(WORKS_QUERY);
    query.$lang = opt.lang;
    query.$values = {
      author: artistUri,
    };

    const queryPromise = sparqlTransformer(query, {
      endpoint: 'http://data.doremus.org/sparql',
      debug: true,
    });

    Promise.all([queryPromise,
      ArtistController.getDetail(artistUri, opt.lang, true),
    ])
      .then((resultArray) => {
        const result = resultArray[0];
        const { name, image } = resultArray[1]['@graph'][0];
        result['@graph'].forEach((x) => {
          x.image = image;
          x.author.author = name;
          if (x.author.description && x.author.description['@value']) x.author.description = x.author.description['@value'];
        });

        result['@id'] = `http://overture.doremus.org${req.originalUrl}`;
        result.generatedAt = (new Date()).toISOString();

        cache.set('artist.works', opt, result);
        res.json(result);
      }).catch((err) => sendStandardError(res, err));
  }

  static query(req, res) {
    console.log(req.query);
    let results;
    const opt = {
 lim: 40,
      lang: 'en',
...req.query,
};

    const data = cache.get('artist.list', opt);
    if (data) return res.json(data);

    const query = clone(LIST_QUERY);
    query.$limit = opt.lim;
    query.$offset = opt.offset;
    query.$lang = opt.lang;

    sparqlTransformer(query, {
      endpoint: 'http://data.doremus.org/sparql',
    }).then((_results) => {
      results = _results;

      const promises = results['@graph'].map((x) => x['@id'])
        .map((id) => ArtistController.getDetail(id, opt.lang, true));
      return Promise.all(promises);
    }).then((details) => {
      results['@id'] = `http://overture.doremus.org${req.originalUrl}`;
      results.generatedAt = (new Date()).toISOString();
      results['@graph'] = details.map((x) => x['@graph'][0]);
      cache.set('artist.list', opt, results);
      res.json(results);
    })
      .catch((err) => sendStandardError(res, err));
  }

  static getDetail(artistUri, lang = 'en', light = false) {
    const opt = {
      artistUri,
      lang,
    };
    const lgt = light ? '.light' : '';
    const cacheId = `artist.detail${artistUri}${lgt}`;

    const data = cache.get(cacheId, opt);
    if (data) return data;

    const query = clone(light ? DETAIL_LIGHT_QUERY : DETAIL_QUERY);

    query.$lang = lang;
    query.$values = {
      id: artistUri,
    };

    return sparqlTransformer(query, {
      endpoint: 'http://data.doremus.org/sparql',
    }).then((result) => {
      const mainItem = result['@graph'][0];
      if (mainItem.birthDate) mainItem.birthDate = sampleDate(mainItem.birthDate);
      if (mainItem.deathDate) mainItem.deathDate = sampleDate(mainItem.deathDate);
      cache.set(cacheId, opt, result);
      return result;
    });
  }
}
