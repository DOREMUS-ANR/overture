import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import {TopInfoComponent} from './doremus/components/top-info/top-info.component';
import {QueriesTestComponent} from './doremus/components/search/queries-test.component';
import {WorkTabComponent} from './doremus/components/work-tab/work-tab.component';
import {PerformanceTabComponent} from './doremus/components/performance-tab/performance-tab.component';
import {RecordingTabComponent} from './doremus/components/recording-tab/recording-tab.component';
import {PersonTabComponent} from './doremus/components/person-tab/person-tab.component';
import {ScoreTabComponent} from './doremus/components/score-tab/score-tab.component';
import {WorkSubDetailComponent} from './doremus/components/work-tab/workSubDetail.component';
import {ExpressionTabComponent} from './doremus/components/expression-tab/expression-tab.component';
import {WipComponent} from './doremus/components/wip/wip.component';


@Component({
  selector: '',
  template: ''
})
class Stub { }

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
