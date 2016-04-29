import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';
import helmet from 'helmet';
import {appPath} from '../config/constants';

export default class RouteConfig {
  static init(application, exp) {
    let _root = process.cwd();

    application.use('/static', exp.static(_root + appPath.clientFiles));
    application.use('/lib', exp.static(_root + '/node_modules'));

    application.use(bodyParser.json());
    application.use(morgan('dev'));
    application.use(contentLength.validateMax({
      max: 999
    }));
    application.use(helmet());

    application.use(bodyParser.json());
    application.use(bodyParser.urlencoded({
      extended: true
    }));
  }
}
