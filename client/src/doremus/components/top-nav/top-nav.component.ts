import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'top-nav',
  templateUrl: 'top-nav.template.html',
  directives: [MdToolbar]
})

export class TopNavComponent {
  clickMade(element) {
    console.log("ClickDone " + element);
  }
}
