import {HomeComponent} from './components/home/home.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';

import {ErrorComponent} from './components/commons/error.component';
import {LoadingComponent} from './components/commons/loading.component';
import {TimelineComponent} from './components/commons/timeline.component';

import {PerformanceTabComponent} from './components/performance-tab/performance-tab.component';
import {RecordingTabComponent} from './components/recording-tab/recording-tab.component';
import {PersonTabComponent} from './components/person-tab/person-tab.component';
import {ScoreTabComponent} from './components/score-tab/score-tab.component';

import {ExpressionComponent} from './components/expression/expression.component';
import {ExpressionListComponent} from './components/expression/expression.list.component';
import {ExpressionDetailComponent} from './components/expression/expression.detail.component';
import {SummaryComponent} from './components/summary/summary.component';

import {TopNavComponent} from './components/top-nav/top-nav.component';
import {SearchComponent} from './components/search/search.component';
import {WipComponent} from './components/wip/wip.component';

export const myComponents = {
  HomeComponent, SearchResultsComponent,
  ErrorComponent, LoadingComponent, TimelineComponent,
  PerformanceTabComponent, RecordingTabComponent, PersonTabComponent, ScoreTabComponent,
  ExpressionComponent, ExpressionListComponent, ExpressionDetailComponent, SummaryComponent,
  WipComponent, TopNavComponent, SearchComponent
};

export const myComponentsList = Object.keys(myComponents).map(key => myComponents[key]);
