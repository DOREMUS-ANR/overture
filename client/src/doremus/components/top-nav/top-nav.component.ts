import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'top-nav',
  templateUrl: 'top-nav.template.html',
  directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})

export class TopNavComponent {

  clickMade(element) {
    console.log("ClickDone " + element);
  }
}
