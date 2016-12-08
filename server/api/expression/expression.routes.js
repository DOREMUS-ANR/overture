import ExpressionController from './expression.api';

export default class DoremusRoutes {
  static init(router) {
//http://overture.doremus.org/api/query?id=selfContainedExpressionDet&uri=%3Chttp://data.doremus.org/expression/37932fbc-fef3-3edb-9fae-1eec9b4be01d%3E&lang=en
   router.get('/expression/:id', ExpressionController.get);
  }
}
