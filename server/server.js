const PORT = process.env.PORT || 3333;

import os from 'os';
import express from 'express';
import http from 'http';
import nomo from 'node-monkey';
import RoutesConfig from './config/routes.conf';
import Routes from './routes/index';

const app = express();
nomo.start({
  suppressOutput: false,
  saveOutput: true
});

RoutesConfig.init(app, express);
Routes.init(app, express.Router());

http.createServer(app)
  .listen(PORT, () => {
    console.info(`up and running @: ${os.hostname()} on port: ${PORT}`);
    console.info(`enviroment: ${process.env.NODE_ENV}`);
  });
