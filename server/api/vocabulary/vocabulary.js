import sparqlTransformer from 'sparql-transformer';
import Lemma from './lemma';
import {
  EXT_URI,
} from '../../../config/constants';

const SKOS = 'http://www.w3.org/2004/02/skos/core#';

const NAMESPACES = {
  genre: [
    'http://data.doremus.org/vocabulary/iaml/genre/',
    'http://data.doremus.org/vocabulary/redomi/genre/',
    'http://data.doremus.org/vocabulary/itema3/genre/',
    'http://data.doremus.org/vocabulary/itema3/genre/musdoc/',
    'http://data.doremus.org/vocabulary/diabolo/genre/',
  ],
  mop: [
    'http://www.mimo-db.eu/InstrumentsKeywords#',
    'http://data.doremus.org/vocabulary/iaml/mop/',
    'http://data.doremus.org/vocabulary/redomi/mop/',
    'http://data.doremus.org/vocabulary/itema3/mop/',
    'http://data.doremus.org/vocabulary/diabolo/mop/',
  ],
};


export default class Vocabulary {
  static createVocabulary(name, trunkNamespace, namespaces, property, lang) {
    Vocabulary.add(name, new Vocabulary(name, trunkNamespace, namespaces, property, lang));
  }

  static add(name, vocabulary) {
    if (!Vocabulary.list) Vocabulary.list = {};
    Vocabulary.list[name] = vocabulary;
  }

  static async load(name) {
    const family = NAMESPACES[name];
    const schemaUri = family || [`http://data.doremus.org/vocabulary/${name}/`];

    return sparqlTransformer({
        '@context': SKOS,
        '@graph': [{
          '@type': 'Concept',
          '@id': '?id',
          prefLabel: '$skos:prefLabel$required',
          altLabel: '$skos:altLabel',
          exactMatch: '$skos:exactMatch',
          inScheme: '$skos:inScheme|skos:topConceptOf$var:namespace$required',
        }],
        $values: {
          namespace: schemaUri,
        },
      }, {
        endpoint: EXT_URI.SPARQL_ENDPOINT,
        debug: true,
      })
      .then((result) => {
        if (family) {
          result['@graph'] = result['@graph'].sort((a, b) => family.indexOf(a.inScheme) - family.indexOf(b.inScheme));

          result['@graph'].filter(x => x.exactMatch)
            .forEach((x) => {
              if (!result['@graph'].includes(x)) return;

              let exm = x.exactMatch;
              if (!Array.isArray(exm)) exm = [exm];
              x.exactMatch = exm.map((ex) => {
                const lemma = result['@graph'].find(l => l['@id'] === ex);
                if (lemma) {
                  result['@graph'].splice(result['@graph'].indexOf(lemma), 1);
                  return lemma;
                }
                return ex;
              });
            });
        }
        Vocabulary.add(name, new Vocabulary(result, family));
      });
  }

  static async get(name) {
    if (!Vocabulary.list) Vocabulary.list = {};
    if (!Vocabulary.list[name]) await Vocabulary.load(name);
    return Vocabulary.list[name];
  }

  constructor(data, family) {
    this.family = family;
    if (Array.isArray(data)) {
      this.lemmata = data;
      return;
    }
    this.lemmata = data['@graph']
      .map(l => new Lemma(l));
  }

  flatten(lang = 'en') {
    return this.lemmata.map(l => l.flatten(lang));
  }

  get data() {
    return {
      '@context': SKOS,
      '@graph': this.lemmata.map(l => l.data),
    };
  }

  get(id) {
    return new Vocabulary(this.lemmata.filter(l => l.id === id));
  }

  search(q, lang, autocomplete = false, n = 10) {
    let matches = this.lemmata
      .map(l => new Lemma(l.data, l.similarTo(q, lang, autocomplete)))
      .filter(l => (l.score > (autocomplete ? 0 : 0.1)));

    if (!autocomplete) {
      const exact = matches.filter(l => l.score === 1);
      if (exact.length) matches = exact;
    }

    matches = matches.sort((a, b) => {
        const d = b.score - a.score;
        if (d || !this.family) return d;
        return this.family.indexOf(b) - this.family.indexOf(a);
      })
      .slice(0, n);

    return new Vocabulary(matches);
  }
}
