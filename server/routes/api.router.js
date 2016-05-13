import express from 'express';
import fs from 'fs';
import path from 'path';

const _root = process.cwd();
var router = express.Router();
var apiFolder = path.join(_root, 'server', 'api');

/* automatically load sub-routes form api folder */
fs.readdirSync(apiFolder).forEach((file) => {
  /* jshint strict:false */
  if (fs.statSync(path.join(apiFolder, file)).isDirectory()) {
    let routesFile = path.join(apiFolder, file, file + '.routes.js');
    require(routesFile).default.init(router);
  }
});

router.get('*', (req, res) => {
  'use strict';
  res.status(404).json({
    error: 'Not Found'
  });
});

export {
  router as
  default
};
