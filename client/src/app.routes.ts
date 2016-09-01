import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import {TopInfoComponent} from './components/top-info/top-info.component';
import {QueriesTestComponent} from './components/search/queries-test.component';
import {WorkTabComponent} from './components/work-tab/work-tab.component';
import {PerformanceTabComponent} from './components/performance-tab/performance-tab.component';
import {RecordingTabComponent} from './components/recording-tab/recording-tab.component';
import {PersonTabComponent} from './components/person-tab/person-tab.component';
import {ScoreTabComponent} from './components/score-tab/score-tab.component';
import {WorkSubDetailComponent} from './components/work-tab/workSubDetail.component';
import {ExpressionTabComponent} from './components/expression-tab/expression-tab.component';
import {WipComponent} from './components/wip/wip.component';

const appRoutes: Routes = [
  {
    path: '',
    // name: 'Main',
    component: TopInfoComponent
    // useAsDefault: true
  },
  {
    path: 'search',
    // name: 'Search',
    component: QueriesTestComponent
  },
  {
    path: 'work',
    component: WorkTabComponent,
    children: [
      {
        path: ':id',
        component: WorkSubDetailComponent
      },
      {
        path: '',
        redirectTo: '1'
      }
    ]
  },
  {
    path: 'performance',
    component: PerformanceTabComponent
  },
  {
    path: 'recording',
    component: RecordingTabComponent
  },
  {
    path: 'person',
    component: PersonTabComponent
  },
  {
    path: 'score',
    component: ScoreTabComponent
  },
  {
    path: 'expression',
    component: ExpressionTabComponent
  },
  {
    path: 'wip',
    component: WipComponent
  }
]

export const routing = RouterModule.forRoot(appRoutes);
