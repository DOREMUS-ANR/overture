import {Component} from '@angular/core';

@Component({
  selector: 'left-menu',
  template: `
    <div id="left_menu">
      <ul id="navigation">
          <li class="info"><span (click)="clickMade('info');" class="menu-icon icon-info-circled"></span></li>
          <li class="about"><span (click)="clickMade('about');" type="button" class="menu-icon icon-help-circled"></span></li>
          <li class="favourites"><span (click)="clickMade('favourites');" class="menu-icon icon-heart-1"></span></li>
      </ul>
    </div>
  `
})

export class LeftMenuComponent {
  clickMade(element){
    console.log("ClickDone " + element);
  }
}
