import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {TopNavComponent} from './top-nav/top-nav.component';
import {LeftMenuComponent} from './left-menu.component';
import {TopInfoComponent} from './top-info.component';
import {QueriesTestComponent} from './queries-test.component';

@Component({
    selector: 'my-app',
    template: `
        <top-nav></top-nav>
        <left-menu></left-menu>

        <router-outlet>see me</router-outlet>
    `,
    directives: [
      TopNavComponent,
      LeftMenuComponent,
      ROUTER_DIRECTIVES
    ]
})

@Routes([
  {
    path: '/',
    // name: 'Main',
    component: TopInfoComponent,
    // useAsDefault: true
  },
  {
    path: '/search',
    // name: 'Search',
    component: QueriesTestComponent
  }
])

export class AppComponent {
    constructor(private router: Router) {}
}
