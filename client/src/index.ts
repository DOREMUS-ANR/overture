import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from "@angular/router";
import {HTTP_BINDINGS} from '@angular/http';
import {AppComponent} from './doremus/components/app.component';
import {SharedService} from './doremus/services/sharedService.service';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_BINDINGS, SharedService])
  .catch(console.error);
