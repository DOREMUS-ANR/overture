import DoremusController from './controller/doremus-controller';

export default class DoremusRoutes {
  static init(router) {

   router.get('/query', DoremusController.sendQuery);
  }
}
