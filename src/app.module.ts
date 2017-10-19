import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './components/app.component';

import { SharedService } from './services/sharedService.service';

import { routing } from './app.routes';
import { Globals } from './app.globals';

import { KeysPipe } from './pipes/keys.pipe';
import { SummaryPipe } from './pipes/summary.pipe';
import { JsonLDvalPipe } from './pipes/jsonLDval.pipe';
import { StripDbpediaPipe } from './pipes/strip_dbpedia.pipe';


import { JsonLdModule } from './jsonld/jsonld.module';



// components
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

import { ErrorComponent } from './components/commons/error.component';
import { LoadingComponent } from './components/commons/loading.component';
import { TimelineComponent } from './components/commons/timeline.component';

import { ArtistComponent } from './components/artist/artist.component';
import { ArtistListComponent } from './components/artist/artist.list.component';
import { ArtistDetailComponent } from './components/artist/artist.detail.component';
import { ArtistSummaryComponent } from './components/artist/artist.summary.component';
import { ArtistRecommendationComponent } from './components/artist/artist.recommendation.component';

import { ScoreTabComponent } from './components/score-tab/score-tab.component';

import { ExpressionComponent } from './components/expression/expression.component';
import { ExpressionListComponent } from './components/expression/expression.list.component';
import { ExpressionDetailComponent } from './components/expression/expression.detail.component';

import { RecommendationComponent } from './components/expression/recommendation.component';
import { SummaryComponent } from './components/summary/summary.component';

import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SearchComponent } from './components/search/search.component';
import { WipComponent } from './components/wip/wip.component';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'overture' }),
    BrowserAnimationsModule, FormsModule, HttpClientModule,
    routing, JsonLdModule,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule,
    InfiniteScrollModule
  ],
  declarations: [AppComponent, KeysPipe, SummaryPipe, JsonLDvalPipe, StripDbpediaPipe,
    HomeComponent, SearchResultsComponent,
    ErrorComponent, LoadingComponent, TimelineComponent,
    ScoreTabComponent,
    ArtistComponent, ArtistListComponent, ArtistDetailComponent, ArtistSummaryComponent, ArtistRecommendationComponent,
    ExpressionComponent, ExpressionListComponent, ExpressionDetailComponent, RecommendationComponent, SummaryComponent,
    WipComponent, TopNavComponent, SearchComponent
  ],
  bootstrap: [AppComponent],
  providers: [SharedService, Globals, KeysPipe, SummaryPipe, JsonLDvalPipe, StripDbpediaPipe, Title]
})
export class AppModule { }
