import {Component, Output, EventEmitter} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import {SharedService} from '../../services/sharedService.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'top-nav',
  templateUrl: 'top-nav.template.html',
  directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})

export class TopNavComponent {
  isOn: boolean = false;

  constructor(private _sharedService: SharedService) {
      this.isOn = _sharedService.get();
  }

  clickSearch(){
    this.isOn = !this.isOn;
    this._sharedService.show();
  }
}
