import VocabularyController from './vocabulary.api';

export default class VocabularyRoutes {
  static init(router) {
    router.get('/vocabulary/:id', VocabularyController.get);
    router.get('/vocabulary/:brand/:id', VocabularyController.get);
  }
}
