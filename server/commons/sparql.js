import fs from 'fs';
import path from 'path';
import SparqlClient from 'sparql-client';
import {
  EXT_URI
} from '../config/constants';

const doremusEndpoint = EXT_URI.SPARQL_ENDPOINT;
const queryFolder = 'server/commons/queries';

export default class Sparql {
  constructor(endpoint = doremusEndpoint) {
    this.endpoint = endpoint;
  }

  execute(query) {
    console.log('*** SPARQL QUERY ***');
    console.log(query);

    var client = new SparqlClient(this.endpoint);

    return new Promise(function(resolve, reject) {
      client.query(query, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

  }

  loadQuery(queryId, opt = {}) {
    if (!queryId) {
      throw Error('The name of the query to load is required');
    }
    let _file = path.join(queryFolder, queryId + '.rq');

    return new Promise((resolve, reject) => {
      fs.readFile(_file, 'utf8', (err, query) => {
        if (err) {
          return reject(err);
        }

        // replace params in query
        for (let param in opt) {
          let regex = new RegExp(`%%${param}%%`, 'g');
          query = query.replace(regex, opt[param]);
        }

        if (opt.offset) {
          query += 'OFFSET ' + opt.offset;
        }

        resolve(this.execute(query));
      });
    });
  }
}
