const PORT = process.env.PORT || 3333;

import os from 'os';
import express from 'express';
import http from 'http';
import nomo from 'node-monkey';
import RoutesConfig from './routes/routes.conf';
import Routes from './routes/routes';

const app = express();
nomo.start({
  suppressOutput: false,
  saveOutput: true
});

RoutesConfig.init(app, express);
Routes.init(app, express.Router());

http.createServer(app)
  .listen(PORT, () => {
    /* jshint strict:false */
    console.info(`up and running @: ${os.hostname()} on port: ${PORT}`);
    console.info(`environment: ${process.env.NODE_ENV}`);
  });
