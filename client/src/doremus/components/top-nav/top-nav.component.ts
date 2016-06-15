import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'top-nav',
  templateUrl: 'top-nav.template.html',
  directives: [ROUTER_DIRECTIVES]
})

export class TopNavComponent {

  clickMade(element) {
    console.log("ClickDone " + element);
  }
}
