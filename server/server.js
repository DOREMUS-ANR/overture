const PORT = process.env.PORT || 3333;

import os from 'os';
import express from 'express';
import http from 'http';
import RoutesConfig from './routes/routes.conf';

const app = express();


let server = http.createServer(app);

RoutesConfig.init(app, express);
// Routes.init(app, express.Router());

server.listen(PORT, () => {
  /* jshint strict:false */
  console.info(`up and running @: ${os.hostname()} on port: ${PORT}`);
  console.info(`environment: ${process.env.NODE_ENV}`);
});
