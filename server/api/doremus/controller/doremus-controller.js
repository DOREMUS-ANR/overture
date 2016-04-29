import fs from 'fs';
import SparqlClient from 'sparql-client';
import {appPath} from '../../../config/constants';

const endpoint = appPath.sparqlEndpoint;

export default class DoremusController {

  static sendQuery(req, res) {
    let query = req.query;

    console.log('Query to ' + endpoint);
    let _q = 'server/commons/queries/' + query.id + '.sparql';
    console.log('Q' + _q);

    readFile(_q)
      .then(content => askQuery(content, endpoint))
      .then(results => res.json(results))
      .catch(err => console.error('error ' + err.message));
  }
}

function readFile(name) {
  return new Promise(function(resolve, reject) {
    fs.readFile(name, 'utf8', function(err, content) {
      if (err) {
        return reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

function askQuery(query, endpoint) {
  var client = new SparqlClient(endpoint);
  return new Promise(function(resolve, reject) {
    client.query(query, function(err, results) {
      if (err) {
        return reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
