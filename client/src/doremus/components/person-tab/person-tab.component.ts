import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'person-tab',
  templateUrl: 'person-tab.template.html',
  directives: [MdToolbar]
})

export class PersonTabComponent {
}
