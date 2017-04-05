import SearchController from './search.api';

export default class SearchRoutes {
  static init(router) {
    router.get('/search/:input', SearchController.get);
  }
}
