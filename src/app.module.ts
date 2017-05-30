import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import 'hammerjs';
import { MaterialModule, MdSelectModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import {SelectModule} from 'ng-select';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {AppComponent} from './components/app.component';

import {SharedService} from './services/sharedService.service';

import { routing }        from './app.routes';
import { Globals } from './app.globals';

import { KeysPipe } from './pipes/keys.pipe';
import { SummaryPipe } from './pipes/summary.pipe';


// components
import {HomeComponent} from './components/home/home.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';

import {ErrorComponent} from './components/commons/error.component';
import {LoadingComponent} from './components/commons/loading.component';
import {TimelineComponent} from './components/commons/timeline.component';

import {ArtistDetailComponent} from './components/artist/artist.detail.component';
import {ScoreTabComponent} from './components/score-tab/score-tab.component';

import {ExpressionComponent} from './components/expression/expression.component';
import {ExpressionListComponent} from './components/expression/expression.list.component';
import {ExpressionDetailComponent} from './components/expression/expression.detail.component';
import {SummaryComponent} from './components/summary/summary.component';

import {TopNavComponent} from './components/top-nav/top-nav.component';
import {SearchComponent} from './components/search/search.component';
import {WipComponent} from './components/wip/wip.component';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, routing, MaterialModule, MdSelectModule, MomentModule, InfiniteScrollModule, SelectModule],
  declarations: [AppComponent, KeysPipe, SummaryPipe,
    HomeComponent, SearchResultsComponent,
    ErrorComponent, LoadingComponent, TimelineComponent,
    ArtistDetailComponent, ScoreTabComponent,
    ExpressionComponent, ExpressionListComponent, ExpressionDetailComponent, SummaryComponent,
    WipComponent, TopNavComponent, SearchComponent
  ],
  bootstrap: [AppComponent],
  providers: [SharedService, Globals, KeysPipe, SummaryPipe, Title]
})
export class AppModule { }
