import {
  Client
} from 'virtuoso-sparql-client';
import fs from 'fs-extra';

const ENDPOINT = new Client('http://data.doremus.org/sparql');
ENDPOINT.setOptions('application/json');

const QUERY = {
  STRUCTURE: fs.readFileSync(`${__dirname}/vocabulary.structure.rq`, 'utf-8'),
  POPULARITY: fs.readFileSync(`${__dirname}/vocabulary.popularity.rq`, 'utf-8')
};

function performQuery(q, namespace, lang) {
  'use strict';
  let query = q
    .replace(/%%lang%%/g, lang)
    .replace(/\?namespace/g, `<${namespace}>`);
  // console.log(query);
  return ENDPOINT.query(query)
    .then(r => r.results.bindings);
}

class Lemma {
  constructor(uri, label, lang, alternateUris = []) {
    this.uri = uri;

    this._labels = {};
    this._labels[lang] = label;

    this.alternateUris = alternateUris;
    this.popularity = 0;
  }

  setLabel(label, lang) {
    if (lang)
      this._labels[lang] = label;
  }

  getLabel(lang) {
    return this._labels[lang] || this._labels.en;
  }
}

export default class Vocabulary {
  static createVocabulary(name, trunkNamespace, namespaces, property, lang) {
    Vocabulary.add(name, new Vocabulary(name, trunkNamespace, namespaces, property, lang));
  }

  static add(name, vocabulary) {
    if (!Vocabulary._list) Vocabulary._list = [];
    Vocabulary._list[name] = vocabulary;
  }
  static get(name) {
    return Vocabulary._list[name];
  }

  constructor(name, trunkNamespace, namespaces, property, lang) {
    console.log('Importing vocabulary', name);
    this.name = name;
    this.lemmata = {};

    this.trunkNamespace = trunkNamespace;
    this.supportedLang = [lang];

    Promise.all([
        performQuery(QUERY.STRUCTURE.replace('?prop', property), trunkNamespace, lang),
        performQuery(QUERY.STRUCTURE.replace('?prop', property), namespaces.join('> <'), lang),
        performQuery(QUERY.POPULARITY.replace('?prop', property), trunkNamespace, lang)
      ]).then(results => {
        let [structureData, otherData, popularityData] = results;
        for (let d of structureData) {
          let lemma = new Lemma(d.uri.value, d.label.value, lang, d.matches.value.split(';'));
          this.lemmata[lemma.uri] = lemma;
          for (let u of lemma.alternateUris)
            this.lemmata[u] = lemma;
        }
        for (let d of otherData) {
          let lemma = new Lemma(d.uri.value, d.label.value, lang, d.matches.value.split(';'));
          if (!this.lemmata[lemma.uri])
            this.lemmata[lemma.uri] = lemma;
        }

        for (let d of popularityData)
          this.lemmata[d.uri.value].popularity = parseInt(d.popularity.value);
      })
      .catch(console.error);
  }

  hasLanguage(lang) {
    return this.supportedLang.includes(lang);
  }

  getList() {
    let _array = Object.keys(this.lemmata)
      .map(k => this.lemmata[k]);
    return Array.from(new Set(_array));
  }

  getFull(lang) {

    return new Promise((resolve, reject) => {
      if (!this.hasLanguage(lang))
        performQuery(QUERY.STRUCTURE, this.trunkNamespace, lang)
        .then(results => {
          for (let d of results)
            this.lemmata[d.uri.value].setLabel(d.label.value, lang);
          this.supportedLang.push(lang);
        })
        .then(() => this.getFull(lang))
        .then(resolve)
        .catch(reject);

      resolve(this.getList()
        .sort((a, b) => b.popularity - a.popularity)
        .map(lemma => ({
          uri: lemma.uri,
          label: lemma.getLabel(lang)
        }))
      );
    });
  }
}
