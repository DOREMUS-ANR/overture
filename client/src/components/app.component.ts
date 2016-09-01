import {Component} from '@angular/core';
import {TopNavComponent} from './top-nav/top-nav.component';

import {WorkSubDetailService} from '../services/workSubDetail.service';
import {QueryService} from '../services/queries.service';

@Component({
  selector: 'my-app',
  templateUrl: 'static/components/app.template.html',
  directives: [ TopNavComponent ],
  providers: [WorkSubDetailService, QueryService]
})


export class AppComponent {
  showSearch: boolean = false
}
