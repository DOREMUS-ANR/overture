import fs from 'fs';
import SparqlClient from 'sparql-client';
import {EXT_URI} from '../../../config/constants';

const endpoint = EXT_URI.SPARQL_ENDPOINT;


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

function askQuery(query, endpoint, req) {
  query = query.replace('$$prop$$', req.prop)
               .replace('$$val$$', req.val)
               .replace('$$lim$$', req.lim)
               .replace('$$lang$$', req.lang)
               .replace(/\$\$expr\$\$/g, req.uri)
               .replace('$$uri$$', req.uri)
               .replace('$$uriKey$$', req.uriKey)
               .replace('$$uriGenre$$', req.uriGenre);
  if(req.key !== undefined){
    var filterKey = 'has_title ?titleAux ; mus:U11_has_key <' + req.key + '>';
    query = query.replace('has_title ?titleAux', filterKey);
  }
  if(req.genre !== undefined){
    var filterGenre = 'has_title ?titleAux ; mus:U12_has_genre <' + req.genre + '>';
    query = query.replace('has_title ?titleAux', filterGenre);
  }
  if(req.title !== undefined){
    var filterTitle = 'FILTER (regex(str(?titleAux),\'' + req.title + '\') && str(?titleAux)';
    query = query.replace('FILTER (str(?titleAux)', filterTitle);
  }
  console.log('askquery: ' + query);
  var client = new SparqlClient(endpoint);
  return new Promise(function(resolve, reject) {
    client.query(query, function(err, results) {
      if (err) {
        console.error(err);
        return reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export default class DoremusController {

  static sendQuery(req, res) {
    let query = req.query;

    //console.log('Query to ' + endpoint);
    //console.log('URI: ' + query.uri);
    let _q = 'server/commons/queries/' + query.id + '.rq';

    readFile(_q)
    .then(content => askQuery(content, endpoint, req.query))
    .then(results => res.json(results))
    .catch(err => console.error('error ' + err.message));
  }
}
