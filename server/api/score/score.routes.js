import ScoreController from './score.api';

export default class PerformanceRoutes {
  static init(router) {
    // detail
    router.get('/score/:id', ScoreController.get);
    // list
    router.get('/score', ScoreController.query);
  }
}
