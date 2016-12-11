import {Component} from '@angular/core';

const headerOpacityThreshold = 300;

@Component({
  selector: 'my-app',
  templateUrl: 'static/components/app.template.html',
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
