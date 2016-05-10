import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {TopNavComponent} from './top-nav/top-nav.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {TopInfoComponent} from './top-info/top-info.component';
import {QueriesTestComponent} from './queries-test/queries-test.component';
import {WorkTabComponent} from './work-tab/work-tab.component';
import {PerformanceTabComponent} from './performance-tab/performance-tab.component';
import {RecordingTabComponent} from './recording-tab/recording-tab.component';
import {PersonTabComponent} from './person-tab/person-tab.component';
import {ScoreTabComponent} from './score-tab/score-tab.component';

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
    component: TopInfoComponent
    // useAsDefault: true
  },
  {
    path: '/search',
    // name: 'Search',
    component: QueriesTestComponent
  },
  {
    path: '/work',
    component: WorkTabComponent
  },
  {
    path: '/performance',
    component: PerformanceTabComponent
  },
  {
    path: '/recording',
    component: RecordingTabComponent
  },
  {
    path: '/person',
    component: PersonTabComponent
  },
  {
    path: '/score',
    component: ScoreTabComponent
  }
])

export class AppComponent {
}
