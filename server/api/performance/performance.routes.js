import PerformanceController from './performance.api';

export default class PerformanceRoutes {
  static init(router) {
    // detail
    router.get('/performance/:id', PerformanceController.get);
    // list
    router.get('/performance', PerformanceController.query);
  }
}
