const prod = (process.env.NODE_ENV === 'production');


export const HOST = prod ? 'overture.doremus.org' : null;

export const APP_PATH = {
  CLIENT_FILES: prod ? '/dist' : '/src',
  RECOMMENDING_PATH: prod ? '/recommending' : '/Users/pasquale/git/recommender/recommending'
};
export const EXT_URI = {
  SPARQL_ENDPOINT: 'http://data.doremus.org/sparql',
  RECOMMENDER: prod ? 'http://recommender:5000' : 'http://localhost:5000'
};
