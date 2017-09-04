export const APP_PATH = {
  CLIENT_FILES: (process.env.NODE_ENV === 'production') ? '/dist' : '/src',
  SCORING_FILES: (process.env.NODE_ENV === 'production') ? '/data/scoring' : '/Users/pasquale/git/recommender/recommending/data/scoring'
};
export const EXT_URI = {
  SPARQL_ENDPOINT: 'http://data.doremus.org/sparql'
};
