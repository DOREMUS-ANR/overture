import DoremusController from '../controller/doremus-controller';

export default class DoremusRoutes {
  static init(router) {

   router
      .route('/query')
      .get(DoremusController.sendQuery);

  }
}
