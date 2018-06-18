import RecommendationController from './recommendation.api';
import PPLiveRecommender from './pplive';

export default class ExpressionRoutes {
  static init(router) {
    //get the similar expression to a given uri
    router.get('/recommendation/artist/:id', RecommendationController.queryArtists);

    //get the similar expression to a given uri
    router.get('/recommendation/:id', RecommendationController.query);
    router.get('/recommendation/expresssion/:id', RecommendationController.query);

    //pp live recommender
    router.get('/pplive/:type/:id', PPLiveRecommender.recommend);
  }
}
