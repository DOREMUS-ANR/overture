const PORT = process.env.PORT || 3333;

import os from 'os';
import express from 'express';
import http from 'http';
import nomo from 'node-monkey';
import RoutesConfig from './routes/routes.conf';
import Routes from './routes/routes';

const app = express();


let server = http.createServer(app);

/* setup monkey*/
let monkey = nomo({
  server: {
    server: server,
    silent:true
  }
});

let monkeyFiles = monkey.getServerPaths();
app.get('/monkey.js', function(req, res) {
  'use strict';
  res.sendFile(`${monkeyFiles.basePath}/${monkeyFiles.client}`);
});
app.get('/monkey', function(req, res) {
  'use strict';

  res.sendFile(`${monkeyFiles.basePath}/${monkeyFiles.index}`);
});
/* end setup monkey*/

RoutesConfig.init(app, express);
Routes.init(app, express.Router());

server.listen(PORT, () => {
  /* jshint strict:false */
  console.info(`up and running @: ${os.hostname()} on port: ${PORT}`);
  console.info(`environment: ${process.env.NODE_ENV}`);

  console.info(`Node Monkey listening at: ${os.hostname()}:${PORT}/monkey`);
});

monkey.attachConsole();
