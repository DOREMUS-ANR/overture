import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import {SummaryInfo} from '../summaryInfo';

import {MdCard, MdCardHeader} from './card';

import {RecommendationCardInfo} from '../recommendations/cardInfo' ;

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'infinite-list',
  templateUrl: 'recommendations.template.html',
  directives: [MdToolbar, MdCard, MdCardHeader, ROUTER_DIRECTIVES],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecommendationsComponent {
	@Input() items: RecommendationCardInfo[];
  @Output() change = new EventEmitter();

  constructor () {}

  goToExpression(item){
    this.change.emit({
      value: item.id
    })
    //console.log("Selected: " + item.id);
  }
}
