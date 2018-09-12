import async from 'async';
import Sparql from '../../commons/sparql';
import sparqlTransformer from 'sparql-transformer';
import Cache from '../../commons/cache';
import jsonfile from 'jsonfile';
import clone from 'clone';

const cache = new Cache();
var sparql = new Sparql();

const LIST_QUERY = jsonfile.readFileSync('server/commons/queries/artist.list.json');
const DETAIL_LIGHT_QUERY = jsonfile.readFileSync('server/commons/queries/artist.detail.light.json');
const DETAIL_QUERY = jsonfile.readFileSync('server/commons/queries/artist.detail.json');

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
  source: 'sourceOrganization'
};

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function complexCompare(a, b) {
  'use strict';
  return a === b || JSON.stringify(a) === JSON.stringify(b);
}

function sampleDate(dateArray) {
  'use strict';
  if (!Array.isArray(dateArray)) return dateArray;
  if (dateArray.length === 0) return null;
  if (dateArray.length === 1) return dateArray[0];

  return dateArray.sort((a, b) => b.length - a.length)[0];
}

function toSchemaOrg(a) {
  'use strict';
  let artist = {
    '@type': 'Person'
  };

  for (let p in a) {
    let m = schemaOrgMapping[p];
    if (m) {
      let x = a[p];
      let val = x && x.value;
      let lang = x['xml:lang'];
      if (lang)
        artist[m] = {
          '@value': val,
          '@language': lang
        };
      else
        artist[m] = val;
    } else
      console.log(`Not mapped prop: ` + p);
  }

  return artist;
}

export default class ArtistController {

  static get(req, res) {
    let artistUri = `http://data.doremus.org/artist/${req.params.id}`;

    async.map(['artist.detail', 'artist.works'], (rq, callback) => {
      sparql.loadQuery(rq, {
          uri: artistUri,
          lang: req.query.lang
        })
        .then(results => {
          let data = results.results.bindings;
          callback(null, data);
        }).catch(err => sendStandardError(res, err));

    }, (err, data) => {
      if (err) return sendStandardError(res, err);
      let artists = data[0].map(toSchemaOrg);

      let artist = artists.reduce((acc, cur) => {
        // merge rows
        for (let p in cur) {
          if (!acc[p]) acc[p] = cur[p];
          else if (complexCompare(acc[p], cur[p]))
            continue;
          else if (!Array.isArray(acc[p]))
            acc[p] = [acc[p], cur[p]];
          else if (!acc[p].find(a => complexCompare(a, cur[p])))
            acc[p].push(cur[p]);
        }
        return acc;
      }, {});

      for (let dateProp of ['birthDate', 'deathDate']) {
        let a = artist[dateProp];
        if (!Array.isArray(a)) continue;
        // keep the most specific one
        artist[dateProp] = a.sort().reverse()[0];
      }

      let works = data[1]
        .filter(d => d.classExpr.value !== 'http://www.w3.org/ns/prov#Entity')
        .map(w => {
          let uri, type, prop;
          let role = w.roleLabel ? w.roleLabel.value : (w.role && w.role.value);

          switch (w.classExpr.value) {
            case 'http://data.doremus.org/ontology#M43_Performed_Expression':
              uri = w.event.value;
              type = 'MusicEvent';
              break;
            case 'http://erlangen-crm.org/efrbroo/F22_Self-Contained_Expression':
              uri = w.expression.value;
              type = 'MusicComposition';
          }

          switch (role) {
            case 'compositeur':
              prop = 'composer';
              break;
            default:
              prop = (type === 'MusicComposition') ? 'author' : 'performer';
          }
          let obj = {
            '@id': uri,
            '@type': type,
            name: w.title && w.title.value,
            sourceOrganization: w.source.value
          };
          if (w.pic) obj.image = w.pic.value;

          if (w.date) {
            let dateProp = (type === 'MusicComposition') ? 'dateCreated' : 'startDate';
            obj[dateProp] = w.date.value;
          }

          obj[prop] = {
            '@type': 'Role',
            'roleName': role,
          };
          obj[prop][prop] = {
            '@id': artist['@id'],
            name: Array.isArray(artist) ? artist.name[0] : artist.name
          };
          return obj;
        });

      return res.json({
        '@context': 'http://schema.org/',
        '@id': 'http://overture.doremus.org' + req.originalUrl,
        'generatedAt': (new Date()).toISOString(),
        '@graph': [artist, ...works]
      });
    });
  }

  static query(req, res) {
    console.log(req.query);
    let results;
    let opt = Object.assign({
      lim: 40,
      lang: 'en'
    }, req.query);

    cache.get('artist.list', opt)
      .then(data => {
        if (data) return res.json(data);

        let query = clone(LIST_QUERY);
        query.$limit = opt.lim;
        query.$offset = opt.offset;
        sparqlTransformer(query, {
            endpoint: 'http://data.doremus.org/sparql'
          }).then(_results => {
            results = _results;

            let promises = results['@graph'].map(x => x['@id'])
              .map(id => ArtistController.getDetail(id, opt.lang, true));
            return Promise.all(promises);
          }).then(details => {
            results['@id'] = 'http://overture.doremus.org' + req.originalUrl;
            results.generatedAt = (new Date()).toISOString();
            results['@graph'] = details.map(x => x['@graph'][0]);
            cache.set('artist.list', opt, results);
            res.json(results);
          })
          .catch(err => sendStandardError(res, err));
      }).catch(err => sendStandardError(res, err));
  }

  static getDetail(artistUri, lang, light = false) {
    let query = clone(light ? DETAIL_LIGHT_QUERY : DETAIL_QUERY);
    query.$lang = lang;
    query.$values = {
      'id': artistUri
    };

    return sparqlTransformer(query, {
      endpoint: 'http://data.doremus.org/sparql'
    }).then(result => {
      result['@graph'][0].birthDate = sampleDate(result['@graph'][0].birthDate);
      result['@graph'][0].deathDate = sampleDate(result['@graph'][0].deathDate);
      cache.set('artist.detail' + light ? '.light' : '', {
        lang
      }, result);
      return result;
    });
  }
  static toSchemaOrg(artist) {
    return toSchemaOrg(artist);
  }

}
