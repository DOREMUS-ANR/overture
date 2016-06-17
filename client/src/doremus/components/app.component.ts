import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router, ROUTER_PROVIDERS} from '@angular/router';
import {TopNavComponent} from './top-nav/top-nav.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {TopInfoComponent} from './top-info/top-info.component';
import {QueriesTestComponent} from './search/queries-test.component';
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
    templateUrl: '../static/doremus/components/app.template.html',
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
