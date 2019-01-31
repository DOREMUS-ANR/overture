import fs from 'fs-extra';
import path from 'path';
import SparqlClient from 'sparql-client2';
import Cache from './cache';
import {
  EXT_URI
} from '../../config/constants';

const doremusEndpoint = EXT_URI.SPARQL_ENDPOINT;
const queryFolder = 'server/queries';

const IF_REGEX = /\$if{(.+)}((.|\n)+?)\$end/g;

function uriWrap(v) {
  'use strict';
  if (typeof v === 'string' && v.startsWith('http:'))
    return `<${v}>`;
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
    if (!queryId)
      throw Error('The name of the query to load is required');

    if (!opt.lang)
      opt.lang = 'en;q=0.9, ru-Latn;q=0.2, grm-Latn;q=0.2, el-Latn;q=0.2 *;q=0.1';

    let _file = path.join(queryFolder, queryId + '.rq');

    opt.offset = opt.offset || 0;

    let data = this.cache.get(queryId, opt);
    if (data) return data;
      return fs.readFile(_file, 'utf8')
        .then(query => {
          console.log('bbb');

          // find and solve the $if statements
          query = query.replace(IF_REGEX,
            (match, condition, content) => opt[condition] ? content : '');

          // replace params in query
          for (let param in opt) {
            let regex = new RegExp(`%%${param}%%`, 'g');
            let value = opt[param];
            if (!Array.isArray(value))
              value = [value];

            value = value.map(uriWrap);
            query = query.replace(regex, value);
          }
          console.log(`*** SPARQL QUERY ${queryId} ***`);
          return this.execute(query);
        }).then(res => {
          this.cache.set(queryId, opt, res);
          return res;
        });
  }

}
