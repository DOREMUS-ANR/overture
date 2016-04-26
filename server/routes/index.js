import DoremusRoutes from '../api/doremus/routes/doremus-routes';
import StaticDispatcher from '../commons/static/index';

export default class Routes {
   static init(app, router) {
     DoremusRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.loadPage);

     app.use('/', router);
   }
}
