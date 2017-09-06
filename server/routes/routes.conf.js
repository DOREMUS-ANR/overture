import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';
import helmet from 'helmet';
import path from 'path';
import {APP_PATH} from '../../config/constants';
import ApiRouter from './api.router';

export default class RouteConfig {
  static init(app, express) {
    let _root = process.cwd();

    app.use('/api', ApiRouter);

    app.use('/lib', express.static(_root + '/node_modules'));
    app.use('/static', express.static(_root + APP_PATH.CLIENT_FILES));
    app.use('/', express.static(_root + APP_PATH.CLIENT_FILES));

    // TODO 404 page
    app.get('*', (req, res) => {
      let accept = req.headers.accept;
      if (accept && accept.includes('text/html')) {
        // client responsability
        res.sendFile(path.join(process.cwd(), APP_PATH.CLIENT_FILES, 'index.html'));
      } else {
        res.status(404).send('404 not found');
      }
    });


    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(contentLength.validateMax({
      max: 999
    }));
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
  }
}
