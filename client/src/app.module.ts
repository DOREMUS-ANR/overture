import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

import { SelectModule } from 'ng2-select';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import {AppComponent} from './components/app.component';
import {myComponentsList} from './app.components.list';

import {SharedService} from './services/sharedService.service';

import { routing }        from './app.routes';
import { Globals } from './app.globals';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, routing, MaterialModule, MomentModule, InfiniteScrollModule, SelectModule],
  declarations: [...myComponentsList, AppComponent],
  bootstrap: [AppComponent],
  providers: [SharedService, Globals]
})

export class AppModule { }
