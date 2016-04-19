import {Component} from 'angular2/core';

@Component({
  selector: 'top-nav',
  template: `
    <div id="top_nav">
      <div class="hamburger active"></div>
      <div class="logo">
        <a href="../">
            <div class="logo-icon" title="Return to the DOREMUS web homepage."></div>
        </a>
      </div>
    </div>
  `
})

export class TopNavComponent {}
