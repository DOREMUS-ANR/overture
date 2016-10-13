import {Component} from '@angular/core';

import {WorkSubDetailService} from '../services/workSubDetail.service';
import {QueryService} from '../services/queries.service';

@Component({
  selector: 'my-app',
  templateUrl: 'static/components/app.template.html',
  providers: [WorkSubDetailService, QueryService]
})

export class AppComponent {
  showSearch: boolean = false
}
