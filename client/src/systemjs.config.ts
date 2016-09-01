(function(global) {
  'use strict';

  let System = global.System;

  // map tells the System loader where to look for things
  const map = {
    'app': 'static/', // 'dist',
    'rxjs': 'lib/rxjs',
    'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
    '@angular': 'lib/@angular',
    '@angular2-material': 'lib/@angular2-material',
    'symbol-observable': 'lib/symbol-observable',
    'angular2-infinite-scroll': 'lib/angular2-infinite-scroll',
    'ng2-select': 'lib/ng2-select',
    'ng2-material-select': 'lib/ng2-material-select'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                 { main: 'index.js', defaultExtension: 'js' },
    'symbol-observable':   { main: 'index.js', defaultExtension: 'js' },
    'ng2-material-select': { main: 'index.js', defaultExtension: 'js' }
  };

  const ngPackageNames: string[] = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'testing',
    'upgrade',
    'forms',
  ];

  // put the names of any of your Material components here
  const ngMaterialPakageNames: string[] = [
    'core',
    'button',
    'card'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: `bundles/${pkgName}.umd.js`, defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  ngMaterialPakageNames.forEach((pkg) => {
    packages[`@angular2-material/${pkg}`] = { main: `${pkg}.js` };
  });

  var config = {
    map: map,
    packages: packages,
    defaultJSExtensions: true
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) {
    global.filterSystemConfig(config);
  }

  System.config(config);

})(this);
