import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'md-card',
  template: `
    <div class="md-card">
	    <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdCard {
}

@Component({
  selector: 'md-card-header',
  template: `
    <ng-content select="[md-card-avatar]"></ng-content>
    <div class="md-card-header-text">
      <ng-content select="md-card-title"></ng-content>
      <ng-content select="md-card-subtitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdCardHeader {
}
