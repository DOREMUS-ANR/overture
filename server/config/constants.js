export const APP_PATH = {
  CLIENT_FILES: (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/'
};
export const EXT_URI = {
  SPARQL_ENDPOINT: 'http://localhost:8890/sparql'
};
