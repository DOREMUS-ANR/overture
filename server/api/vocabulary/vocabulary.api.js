import Vocabulary from './Vocabulary';
import {
  sendStandardError
} from '../../commons/utils';

Vocabulary.createVocabulary('genre', 'http://data.doremus.org/vocabulary/iaml/genre/', [
  'http://data.doremus.org/vocabulary/redomi/genre/',
  'http://data.doremus.org/vocabulary/itema3/genre/',
  'http://data.doremus.org/vocabulary/itema3/genre/musdoc/',
  'http://data.doremus.org/vocabulary/diabolo/genre/',
  'http://data.bnf.fr/ark:/12148/'
], 'mus:U12_has_genre', 'en');
Vocabulary.createVocabulary('mop', 'http://www.mimo-db.eu/InstrumentsKeywords', [
    'http://data.doremus.org/vocabulary/iaml/mop/',
    'http://data.doremus.org/vocabulary/redomi/mop/',
    'http://data.doremus.org/vocabulary/itema3/mop/',
    'http://data.doremus.org/vocabulary/diabolo/mop/'
  ],
  'mus:U2_foresees_use_of_medium_of_performance', 'en');
Vocabulary.createVocabulary('key', 'http://data.doremus.org/vocabulary/key/', [], 'mus:U11_has_key', 'en');


export default class VocabularyController {
  static get(req, res) {

    let {
      id
    } = req.params;
    let {
      lang
    } = req.query;
    let voc = Vocabulary.get(id);

    voc.getFull(lang)
      .then(results => res.json(results))
      .catch(err => sendStandardError(res, err));
  }
}
