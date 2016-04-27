import fs from 'fs';

export default class DoremusController {

  static sendQuery(req, res) {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var endpoint = 'http://localhost:8890/sparql';

    console.log("Query to " + endpoint);
    let _q = 'server/commons/queries/' + query.id + '.sparql';
    console.log('Q' + _q);

    readFile(_q)
    .then(content => askQuery(content, endpoint))
    .then(results => res.json(results))
    .catch(err => console.log('error ' + err.message));
  }
}

function readFile (name) {
  return new Promise(function(resolve, reject) {
    fs.readFile(name, 'utf8', function(err,content){
      if(err){
        //process.stdout.write("error" + err + "\n");
        return reject(err);
      }
      else{
        //process.stdout.write("data" + content + "\n");
        resolve(content);
      }
    })
  }
  )
}

function askQuery (query, endpoint) {
  var util = require('util');
  var SparqlClient = require('../client');
  var client = new SparqlClient(endpoint);
  return new Promise(function(resolve, reject) {
    client.query(query, function (err, results) {
      if(err)  {
        //process.stdout.write(util.inspect(error, null, 20, true) + "\n");
        return reject(err);
      }
      else {
        //process.stdout.write(results + "\n");
        //process.stdout.write(util.inspect(results, null, 20, true) + "\n");
        resolve(results);
      }
    })
  })
}
