///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
// do not remove! see https://github.com/angular/angular/issues/4902#issuecomment-183763614
"use strict";
var browser_1 = require('angular2/platform/browser');
var app_component_1 = require('./doremus/components/app.component');
var router_1 = require("angular2/router");
var http_1 = require('angular2/http');
browser_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, http_1.HTTP_BINDINGS])
    .catch(console.error);
