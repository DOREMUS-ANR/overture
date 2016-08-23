(function(global) {
  'use strict';
  // map tells the System loader where to look for things
  var map = {
    'app': 'static/', // 'dist',
    'rxjs': 'lib/rxjs',
    'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
    '@angular': 'lib/@angular',
    '@angular2-material': 'lib/@angular2-material',
    'symbol-observable': 'lib/symbol-observable',
    'angular2-infinite-scroll': 'lib/angular2-infinite-scroll',
    'ng2-select': 'lib/ng2-select'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'symbol-observable': {
      main: 'index.js',
      defaultExtension: 'js'
    }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
    '@angular/forms',
  ];


  packageNames.forEach(function(pkgName) {
    packages[pkgName] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
  });

  // put the names of any of your Material components here
  const materialPkgs: string[] = [
    'core',
    'button',
    'card',
  ];

  materialPkgs.forEach((pkg) => {
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
