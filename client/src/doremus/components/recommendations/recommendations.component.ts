import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import { NgFor } from '@angular/common';

import { SummaryInfo } from '../summaryInfo';
import { RecommendationService } from '../../services/recommendations.service';

import {MdCard, MdCardHeader} from './card';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'infinite-list',
  inputs: ['items'],
  templateUrl: 'recommendations.template.html',
  directives: [NgFor, MdToolbar, MdCard, MdCardHeader],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecommendationsComponent implements OnInit{
	@Input() items;
  option: String;

  constructor (
    private service: RecommendationService) {}

  ngOnInit(){
    // this.service.getInformations().then(info => this.infos = info);
  }
}
