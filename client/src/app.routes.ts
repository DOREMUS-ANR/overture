import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { myComponents } from './app.components.list';

const appRoutes: Routes = [
  { path: '', component: myComponents.HomeComponent },
  { path: 'search/:input', component: myComponents.SearchResultsComponent, data: { title: 'Search' } },
  { path: 'performance', component: myComponents.WipComponent, data: { title: 'Performances' } },
  { path: 'recording', component: myComponents.RecordingTabComponent, data: { title: 'Recording' }},
  { path: 'person', component: myComponents.PersonTabComponent, data: { title: 'Artists' } },
  { path: 'score', component: myComponents.ScoreTabComponent, data: { title: 'Scores' } },
  {
    path: 'expression', component: myComponents.ExpressionComponent,
    children: [
      { path: ':id', component: myComponents.ExpressionDetailComponent },
      { path: '', component: myComponents.ExpressionListComponent, data: { title: 'Expressions' } }
    ]
  },
  { path: 'wip', component: myComponents.WipComponent },
  { path: '**', component: myComponents.HomeComponent }
]

export const routing = RouterModule.forRoot(appRoutes);
