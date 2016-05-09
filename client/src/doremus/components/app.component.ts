import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {TopNavComponent} from './top-nav.component';
import {LeftMenuComponent} from './left-menu.component';
import {TopInfoComponent} from './top-info.component';
import {QueriesTestComponent} from './queries-test.component';

@Component({
    selector: 'my-app',
    template: `
        <top-nav></top-nav>
        <left-menu></left-menu>

        <router-outlet></router-outlet>
    `,
    directives: [
      TopNavComponent,
      LeftMenuComponent,
      TopInfoComponent,
      QueriesTestComponent,
      ROUTER_DIRECTIVES
    ],
    providers: [
      ROUTER_PROVIDERS,
    ]
})

@RouteConfig([
  {
    path: '/main',
    name: 'Main',
    component: TopInfoComponent,
    useAsDefault: true
  },
  {
    path: '/search',
    name: 'Search',
    component: QueriesTestComponent
  }
])

export class AppComponent {
}
