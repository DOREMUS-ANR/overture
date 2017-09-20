import Sparql from '../../commons/sparql';

var sparql = new Sparql();

const propertyMap = {
  mop: 'mus:U2_foresees_use_of_medium_of_performance_of_type',
  key: 'mus:U11_has_key',
  genre: 'mus:U12_has_genre'
};

export default class VocabularyController {
  static get(req, res) {

    sparql.loadQuery('vocabulary', {
        prop: propertyMap[req.params.id],
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
