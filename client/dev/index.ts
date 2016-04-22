import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './doremus/components/app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS]);
console.log("i'm eva");
