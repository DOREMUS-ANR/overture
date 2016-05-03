///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
// do not remove! see https://github.com/angular/angular/issues/4902#issuecomment-183763614

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './doremus/components/app.component';
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_BINDINGS} from 'angular2/http';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_BINDINGS])
  .catch(console.error);
