import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

// components
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

import { ArtistComponent } from './components/artist/artist.component';
import { ArtistListComponent } from './components/artist/artist.list.component';
import { ArtistDetailComponent } from './components/artist/artist.detail.component';

import { ScoreTabComponent } from './components/score-tab/score-tab.component';

import { ExpressionComponent } from './components/expression/expression.component';
import { ExpressionListComponent } from './components/expression/expression.list.component';
import { ExpressionDetailComponent } from './components/expression/expression.detail.component';

import { PerformanceComponent } from './components/performance/performance.component';
import { PerformanceListComponent } from './components/performance/performance.list.component';

import { WipComponent } from './components/wip/wip.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:input', component: SearchResultsComponent, data: { title: 'Search' } },
  { path: 'recording', component: WipComponent, data: { title: 'Recording' } },
  { path: 'score', component: ScoreTabComponent, data: { title: 'Scores' } },
  {
    path: 'artist', component: ArtistComponent,
    children: [
      { path: ':id', component: ArtistDetailComponent },
      { path: '', component: ArtistListComponent, data: { title: 'Artists' } }
    ]
  },
  {
    path: 'expression', component: ExpressionComponent,
    children: [
      { path: ':id', component: ExpressionDetailComponent },
      { path: '', component: ExpressionListComponent, data: { title: 'Expressions' } }
    ]
  },
  {
    path: 'performance', component: WipComponent
  },
  // {
  //   path: 'performance', component: PerformanceComponent,
  //   children: [
  //     { path: '', component: PerformanceListComponent, data: { title: 'Performances' } }
  //   ]
  // },
  { path: 'wip', component: WipComponent },
  { path: '**', component: HomeComponent }
]

export const routing = RouterModule.forRoot(appRoutes);
