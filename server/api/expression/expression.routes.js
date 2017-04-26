import ExpressionController from './expression.api';

export default class ExpressionRoutes {
  static init(router) {
    //expression detail
    router.get('/expression/:id', ExpressionController.get);
    //expression realisations
    router.get('/expression/:id/realisations', ExpressionController.getRealisations);
    //expression list
    router.get('/expression', ExpressionController.query);
  }
}
