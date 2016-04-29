export const appPath = {
  sparqlEndpoint: 'http://localhost:8890/sparql',
  clientFiles: (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/'
};
