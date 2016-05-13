import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';
import helmet from 'helmet';
import {APP_PATH} from '../config/constants';

export default class RouteConfig {
  static init(app, express) {
    let _root = process.cwd();

    app.use('/static', express.static(_root + APP_PATH.CLIENT_FILES));
    app.use('/lib', express.static(_root + '/node_modules'));

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
