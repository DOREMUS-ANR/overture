import Sparql from '../../commons/sparql';

var sparql = new Sparql();

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function addProp(prop, value, target) {
  'use strict';

  if (!value || target[prop] === value) {
    return;
  }
  if (!target[prop]) {
    target[prop] = value;
    return;
  }

  if (!Array.isArray(target[prop])) {
    target[prop] = [target[prop]];
  }

  if (!target[prop].includes(value)) {
    target[prop].push(value);
  }
}

function _processResult(res) {
  'use strict';
  let bindings = res.results.bindings;
  bindings.forEach(b => {
    Object.keys(b).forEach(prop => b[prop] = b[prop].value);
  });

  // merge if they have the same uri
  bindings.sort((a, b) =>
    a.expression === b.expression ?
    0 :
    a.expression > b.expression ? 1 : -1);
  let prev = {};

  return bindings.filter((b) => {
    if (b.expression === prev.expression) {
      Object.keys(b).forEach(prop => addProp(prop, b[prop], prev));
      return false; // remove it
    }
    prev = b;
    return true; // keep it
  });

}

export default class SearchController {
  static get(req, res) {
    let input = req.params.input.replace(/[()[\]?*+]/g,'');
    let inputRegex = input.split(' ').filter(str => str.length > 3).join('|');

    sparql.loadQuery('expression.fullsearch', {
        input: inputRegex,
        lang: req.query.lang
      })
      .then(results => {
        let bindings = _processResult(results);
        let re = new RegExp(input.replace(/ /g,'|'), 'gi');

        bindings.forEach(b => {
          let title = Array.isArray(b.title) ? b.title : [b.title];
          let full = Array.isArray(b.full) ? b.full : [b.full];

          let fullMatch = Math.max.apply(null, full.map((f) => (f.match(re) || []).length));
          let titleMatch = Math.max.apply(null, title.map((t) => (t.match(re) || []).length));

          b.score = fullMatch + titleMatch; // matches in the title counts double
        });

        bindings.sort((a, b) => b.score - a.score);
        res.json(bindings);
      })
      .catch(err => sendStandardError(res, err));
  }
}
