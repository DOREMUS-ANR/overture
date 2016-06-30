import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_BINDINGS} from '@angular/http';
import {AppComponent} from './doremus/components/app.component';
import {SharedService} from './doremus/services/sharedService.service';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS, HTTP_BINDINGS, SharedService])
  .catch(console.error);
