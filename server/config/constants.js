export const APP_PATH = {
  CLIENT_FILES: (process.env.NODE_ENV === 'production') ? '/dist' : '/src',
  RECOMMENDING_PATH: (process.env.NODE_ENV === 'production') ? '/recommending' : '/Users/pasquale/git/recommender/recommending'
};
export const EXT_URI = {
  SPARQL_ENDPOINT: 'http://data.doremus.org/sparql'
};
