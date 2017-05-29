import ApiRouter from '../routes/api.router';
import path from 'path';
import {
  APP_PATH
} from '../config/constants';

export default class Routes {
  static init(app, router) {

    // api
    router.use('/api', ApiRouter);

    // // angular entry point
    // router.get('/', (req, res) =>
    //   res.sendFile(path.join(process.cwd(), APP_PATH.CLIENT_FILES, 'index.html'))
    // );
    //
    // // not resolved static & modules
    // router.use('/lib', (req, res) => {res.status(404).send();});
    // router.use('/', (req, res) => {res.status(404).send();});

    // // TODO 404 page
    // router.get('*', (req, res) => {
    //   let accept = req.headers.accept;
    //   if (accept && accept.includes('text/html')) {
    //     // client responsability
    //     res.sendFile(path.join(process.cwd(), APP_PATH.CLIENT_FILES, 'index.html'));
    //   } else {
    //     res.status(404).send('404 not found');
    //   }
    // });

    app.use('/', router);
  }

}
