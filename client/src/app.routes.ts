import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import {myComponents} from './app.components.list';

const appRoutes: Routes = [
  {
    path: '',
    // name: 'Main',
    component: myComponents.HomeComponent
    // useAsDefault: true
  },
  {
    path: 'search',
    // name: 'Search',
    component: myComponents.QueriesTestComponent
  },
  {
    path: 'performance',
    component: myComponents.WipComponent
  },
  {
    path: 'recording',
    component: myComponents.RecordingTabComponent
  },
  {
    path: 'person',
    component: myComponents.PersonTabComponent
  },
  {
    path: 'score',
    component: myComponents.ScoreTabComponent
  },
  {
    path: 'expression',
    component: myComponents.ExpressionComponent,
    children: [
      {
        path: ':id',
        component: myComponents.ExpressionDetailComponent
      },
      {
        path: '',
        component: myComponents.ExpressionListComponent
      }
    ]
  },
  {
    path: 'wip',
    component: myComponents.WipComponent
  }
]

export const routing = RouterModule.forRoot(appRoutes);
