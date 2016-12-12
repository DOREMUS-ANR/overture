import RecommendationController from './recommendation.api';

export default class ExpressionRoutes {
  static init(router) {
    //get the similar expression to a given uri
    router.get('/recommendation/:id', RecommendationController.query);
  }
}
