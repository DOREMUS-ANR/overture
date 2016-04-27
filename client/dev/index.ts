import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './doremus/components/app.component';
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_BINDINGS} from 'angular2/http';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_BINDINGS])
  .catch(console.error);
