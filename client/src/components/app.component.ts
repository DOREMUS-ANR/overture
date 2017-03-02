import { Component } from '@angular/core';
const headerOpacityThreshold = 300;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.template.html',
  host: {
    '(window:scroll)': 'updateHeaderOpacity($event)'
  }
})
export class AppComponent {
  showSearch: boolean = false
  headerOpacity: number = 0

  ngOnInit() {

  }

  updateHeaderOpacity(evt) {
    let currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    let headerOpacity = isNaN(currPos) ? 0 : currPos / headerOpacityThreshold;
    this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity;
  }

}
