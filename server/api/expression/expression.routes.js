import ExpressionController from './expression.api';

export default class ExpressionRoutes {
  static init(router) {
    //expression detail
    router.get('/expression/:id', ExpressionController.get);
    //expression list
    router.get('/expression', ExpressionController.query);
  }
}
