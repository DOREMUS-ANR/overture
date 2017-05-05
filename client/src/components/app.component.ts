import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    // set title based on the title of the route in app.routes.ts
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        let title = event.title || 'Overture';
        return this.titleService.setTitle(title);
     });
  }

  updateHeaderOpacity(evt) {
    let currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    let headerOpacity = isNaN(currPos) ? 0 : currPos / headerOpacityThreshold;
    this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity;
  }

}
