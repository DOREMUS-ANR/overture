import {Component} from '@angular/core';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'left-menu',
  templateUrl: 'left-menu.template.html'
})

export class LeftMenuComponent {
  clickMade(element){
    console.log("ClickDone " + element);
  }
}
