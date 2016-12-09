import ExpressionController from './vocabulary.api';

export default class VocabularyRoutes {
  static init(router) {
   router.get('/vocabulary/:id', ExpressionController.get);
  }
}
