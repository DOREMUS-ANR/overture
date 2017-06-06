import Sparql from '../../commons/sparql';

var sparql = new Sparql();

const schemaOrgMapping = {
  uri: '@id',
  label: 'name',
  pic: 'image',
  names: 'additionalName',
  birth: 'birthDate',
  death: 'deathDate',
  comment: 'description',
  wikipedia: 'mainEntityOfPage',
  sameAs: 'sameAs'
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
    sparql.loadQuery('artist.detail', {
        uri: artistUri,
        lang: req.query.lang || 'en'
      })
      .then(results => {
        let data = results.results.bindings;
        let artists = data.map(toSchemaOrg);
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
        return res.json({
          '@context': 'http://schema.org/',
          '@id': 'http://overture.doremus.org' + req.originalUrl,
          'generatedAt': (new Date()).toISOString(),
          '@graph': [artist]
        });
      })
      .catch(err => sendStandardError(res, err));
  }

  static query(req, res) {
    console.log(req.query);
    let opt = Object.assign({
      lim: 20,
      lang: 'en'
    }, req.query);
    sparql.loadQuery('artist.list', opt)
      .then(results => {
        let data = results.results.bindings;
        let artists = data.map(toSchemaOrg);
        return res.json({
          '@context': 'http://schema.org/',
          '@id': 'http://overture.doremus.org' + req.originalUrl,
          'generatedAt': (new Date()).toISOString(),
          '@graph': artists
        });
      })
      .catch(err => sendStandardError(res, err));
  }

}
