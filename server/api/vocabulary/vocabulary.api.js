import Sparql from '../../commons/sparql';

var sparql = new Sparql();

export default class VocabularyController {
  static get(req, res) {

    sparql.loadQuery('vocabulary', {
        uri: `<http://data.doremus.org/vocabulary/${req.params.id}/>`,
        lang: req.query.lang
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
