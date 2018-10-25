import Vocabulary from './vocabulary';
import {
  sendStandardError,
} from '../../commons/utils';

export default class VocabularyController {
  static get(req, res) {
    let {
      brand,
      id,
    } = req.params;
    if (brand) {
      id = `${brand}/${id}`;
      brand = '';
    }
    const {
      lang,
      format,
      q,
      lemma,
    } = req.query;

    const autocomplete = 'autocomplete' in req.query;

    Vocabulary.get(id)
      .then((voc) => {
        if (lemma) return voc.get(lemma);
        if (q) return voc.search(q, lang, autocomplete);
        return voc;
      })
      .then((voc) => {
        const results = format === 'json-ld' ? voc.data : voc.flatten(lang);
        res.json(results);
      })
      .catch(err => sendStandardError(res, err));
  }
}
