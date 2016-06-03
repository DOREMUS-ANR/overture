import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router, ROUTER_PROVIDERS} from '@angular/router';
import {TopNavComponent} from './top-nav/top-nav.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {TopInfoComponent} from './top-info/top-info.component';
import {QueriesTestComponent} from './queries-test/queries-test.component';
import {WorkTabComponent} from './work-tab/work-tab.component';
import {PerformanceTabComponent} from './performance-tab/performance-tab.component';
import {RecordingTabComponent} from './recording-tab/recording-tab.component';
import {PersonTabComponent} from './person-tab/person-tab.component';
import {ScoreTabComponent} from './score-tab/score-tab.component';
import {WorkSubDetailComponent} from './work-tab/workSubDetail.component';
import {ExpressionTabComponent} from './expression-tab/expression-tab.component';
import {WorkSubDetailService} from '../services/workSubDetail.service';
import {RecommendationService} from '../services/recommendations.service';

@Component({
    selector: 'my-app',
    template: `
        <header class="header"><top-nav></top-nav></header>
        <aside class="aside"><left-menu></left-menu></aside>
        <article class="main"><router-outlet></router-outlet></article>
        <footer class="footer"><p>DOREMUS 2016</p></footer>
    `,
    directives: [
      TopNavComponent,
      LeftMenuComponent,
      ROUTER_DIRECTIVES
    ],
    providers:[WorkSubDetailService, RecommendationService]
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
  },
  {
    path: '/expression',
    component: ExpressionTabComponent
  }
])

export class AppComponent {
}
