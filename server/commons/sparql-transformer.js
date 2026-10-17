export const DEFAULT_PREFIXES = {
  ecrm: 'http://erlangen-crm.org/current/',
  efrbroo: 'http://erlangen-crm.org/efrbroo/',
  mus: 'http://data.doremus.org/ontology#',
  skos: 'http://www.w3.org/2004/02/skos/core#',
  prov: 'http://www.w3.org/ns/prov#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  schema: 'http://schema.org/',
  owl: 'http://www.w3.org/2002/07/owl#',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  dbo: 'http://dbpedia.org/ontology/',
  dc: 'http://purl.org/dc/elements/1.1/',
  dcterms: 'http://purl.org/dc/terms/',
  time: 'http://www.w3.org/2006/time#',
  geonames: 'http://www.geonames.org/ontology#',
  dbpprop: 'http://dbpedia.org/property/',
};

// sparql-transformer 3.x is ESM-only, this app compiles to CommonJS, and
// babel's default-import interop cannot unwrap an ESM namespace.
const transformerReady = import('sparql-transformer').then((mod) => {
  const transform = mod.default;
  if (typeof transform !== 'function') {
    throw new Error('sparql-transformer did not resolve to a function');
  }
  return (query, options = {}) => {
    query.$prefixes = Object.assign({}, DEFAULT_PREFIXES, query.$prefixes);
    return transform(query, options);
  };
});

export default function sparqlTransformer(query, options = {}) {
  return transformerReady.then((transform) => transform(query, options));
}
