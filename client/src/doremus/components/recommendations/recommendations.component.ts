import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import { NgFor } from '@angular/common';

import { SummaryInfo } from '../summaryInfo';
import { RecommendationService } from '../../services/recommendations.service';

import {MdCard, MdCardHeader} from './card';

import {QueriesService} from "../../services/queries-test.service";
import {RecommendationCardInfo} from '../recommendations/cardInfo' ;

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'infinite-list',
  inputs: ['items'],
  templateUrl: 'recommendations.template.html',
  directives: [NgFor, MdToolbar, MdCard, MdCardHeader, ROUTER_DIRECTIVES],
	changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QueriesService]
})

export class RecommendationsComponent implements OnInit{
	@Input() items: RecommendationCardInfo[];
  option: String;

  constructor (
    private service: RecommendationService) {}

  ngOnInit(){
    // this.service.getInformations().then(info => this.infos = info);
  }

  goToExpression(item){
    console.log('Click ' + item.id);
  }
}
