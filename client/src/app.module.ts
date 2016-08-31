import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';

import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { InfiniteScrollModule } from 'angular2-infinite-scroll/angular2-infinite-scroll';

import {AppComponent} from './doremus/components/app.component';

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
import {SharedService} from './doremus/services/sharedService.service';

import { routing }        from './app.routes';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routing, MdButtonModule, InfiniteScrollModule],
  declarations: [AppComponent, TopInfoComponent, QueriesTestComponent, WorkTabComponent, PerformanceTabComponent, RecordingTabComponent, PersonTabComponent, ScoreTabComponent, WorkSubDetailComponent, ExpressionTabComponent, WipComponent],
  bootstrap: [AppComponent],
  providers: [ SharedService ]
})

export class AppModule { }
