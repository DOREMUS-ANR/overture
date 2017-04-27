import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import 'hammerjs';
import { MaterialModule, MdSelectModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import {SelectModule} from 'ng-select';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {AppComponent} from './components/app.component';
import {myComponentsList} from './app.components.list';

import {SharedService} from './services/sharedService.service';

import { routing }        from './app.routes';
import { Globals } from './app.globals';

import { KeysPipe } from './pipes/keys.pipe';
import { SummaryPipe } from './pipes/summary.pipe';



@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, routing, MaterialModule, MdSelectModule, MomentModule, InfiniteScrollModule, SelectModule],
  declarations: [...myComponentsList, AppComponent, KeysPipe, SummaryPipe],
  bootstrap: [AppComponent],
  providers: [SharedService, Globals, KeysPipe, SummaryPipe]
})

export class AppModule { }
