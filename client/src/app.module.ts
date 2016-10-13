import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MaterialModule } from '@angular/material';

// import { MdButtonModule } from '@angular2-material/button';
// import { MdCardModule } from '@angular2-material/card';

// import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import {AppComponent} from './components/app.component';

import {TopInfoComponent} from './components/top-info/top-info.component';
import {QueriesTestComponent} from './components/search/queries-test.component';
import {WorkTabComponent} from './components/work-tab/work-tab.component';
import {PerformanceTabComponent} from './components/performance-tab/performance-tab.component';
import {RecordingTabComponent} from './components/recording-tab/recording-tab.component';
import {PersonTabComponent} from './components/person-tab/person-tab.component';
import {ScoreTabComponent} from './components/score-tab/score-tab.component';
import {WorkSubDetailComponent} from './components/work-tab/workSubDetail.component';
import {ExpressionTabComponent} from './components/expression-tab/expression-tab.component';
import {TopNavComponent} from './components/top-nav/top-nav.component';
import {RecommendationsComponent} from './components/recommendations/recommendations.component';
import {SearchComponent} from './components/search/search.component';

import {WipComponent} from './components/wip/wip.component';
import {SharedService} from './services/sharedService.service';

import { routing }        from './app.routes';
import { Globals } from './app.globals';

const myComponents = [
  AppComponent, TopInfoComponent, QueriesTestComponent, WorkTabComponent, PerformanceTabComponent, RecordingTabComponent, PersonTabComponent, ScoreTabComponent, WorkSubDetailComponent, ExpressionTabComponent, WipComponent, TopNavComponent, SearchComponent, RecommendationsComponent
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routing, MaterialModule.forRoot(), InfiniteScrollModule],
  declarations: [...myComponents],
  bootstrap: [AppComponent],
  providers: [SharedService, Globals]
})

export class AppModule { }
