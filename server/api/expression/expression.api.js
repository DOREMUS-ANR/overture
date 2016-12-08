import Sparql from '../../commons/sparql';

var sparql = new Sparql();

export default class ExpressionController {
  static get(req, res) {
    console.log(req.params);
    sparql.loadQuery('expression.detail', {
        uri: `<http://data.doremus.org/expression/${req.params.id}>`
      })
      .then(results => res.json(results))
      .catch(err => {
        console.error('error ', err.message);
        res.status(500).send({
          code: 500,
          message: err.message
        });
      });
  }
}
