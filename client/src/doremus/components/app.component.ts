import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TopNavComponent} from './top-nav/top-nav.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';

import {WorkSubDetailService} from '../services/workSubDetail.service';
import {QueryService} from '../services/queries.service';

@Component({
  selector: 'my-app',
  templateUrl: '../static/doremus/components/app.template.html',
  directives: [
    TopNavComponent,
    LeftMenuComponent,
    ROUTER_DIRECTIVES
  ],
  providers: [WorkSubDetailService, QueryService]
})


export class AppComponent {
}
