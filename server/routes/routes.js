import ApiRouter from '../routes/api.router';
import path from 'path';
import {appPath} from '../config/constants';

export default class Routes {
  static init(app, router) {

    // api
    router.use('/api', ApiRouter);

    // angular entry point
    router.get('/', (req, res) =>
      res.sendFile(path.join(process.cwd(), appPath.clientFiles, 'index.html'))
    );

    // TODO 404 page
    router.get('*', (req, res) =>
      res.sendFile(path.join(process.cwd(), 'client/dev/index.html'))
    );

    app.use('/', router);
  }

}
