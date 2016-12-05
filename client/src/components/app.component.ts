import {Component} from '@angular/core';

import {QueryService} from '../services/queries.service';

@Component({
  selector: 'my-app',
  templateUrl: 'static/components/app.template.html',
  providers: [QueryService]
})

export class AppComponent {
  showSearch: boolean = false
}
