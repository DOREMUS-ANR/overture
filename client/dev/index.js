"use strict";
const browser_1 = require('angular2/platform/browser');
const app_component_1 = require('./doremus/components/app.component');
const router_1 = require("angular2/router");
const http_1 = require('angular2/http');
browser_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, http_1.HTTP_BINDINGS])
    .catch(console.error);
//# sourceMappingURL=index.js.map