import fs from 'fs';
import path from 'path';
import SparqlClient from 'sparql-client2';
import Cache from './cache';
import {
  EXT_URI
} from '../config/constants';

const doremusEndpoint = EXT_URI.SPARQL_ENDPOINT;
const queryFolder = 'server/commons/queries';

function uriWrap(v) {
  'use strict';
  if (typeof v === 'string' && v.startsWith('http:')) {
    return `<${v}>`;
  }
  return v;
}

export default class Sparql {
  constructor(endpoint = doremusEndpoint) {
    this.endpoint = endpoint;
    this.cache = new Cache();
    this.client = new SparqlClient(this.endpoint);
  }

  execute(query) {
    console.log(query);

    return new Promise((resolve, reject) => {
      this.client.query(query, function(err, results) {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  loadQuery(queryId, opt = {}) {
    if (!queryId) {
      throw Error('The name of the query to load is required');
    }

    let _file = path.join(queryFolder, queryId + '.rq');

    return new Promise((resolve, reject) => {
      if (!opt.offset) {
        opt.offset = 0;
      }

      this.cache.get(queryId, opt).then(resolve, () => {
        fs.readFile(_file, 'utf8', (err, query) => {
          if (err) {
            return reject(err);
          }

          // find and solve the $if statements
          let ifRegex = /\$if{(.+)}((.|\n)+?)\$end/g;
          query = query.replace(ifRegex, (match, condition, content) => {
            if (opt[condition]) {
              return content;
            }
            return '';
          });

          // replace params in query
          for (let param in opt) {
            let regex = new RegExp(`%%${param}%%`, 'g');
            let value = opt[param];
            if (!Array.isArray(value)) {
              value = [value];
            }
            value = value.map(uriWrap);
            query = query.replace(regex, value);
          }
          console.log(`*** SPARQL QUERY ${queryId} ***`);
          resolve(this.execute(query).then(res => this.cache.set(queryId, opt, res)));
        });
      });
    });
  }

}
