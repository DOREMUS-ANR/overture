import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {NgStyle, NgClass} from '@angular/common';
import {InfiniteScroll} from 'angular2-infinite-scroll/angular2-infinite-scroll';
import {RecommendationsComponent} from '../recommendations/recommendations.component';
import { RecommendationService } from '../../services/recommendations.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'expression-tab',
  templateUrl: 'expression-tab.template.html',
  directives: [MdToolbar, NgStyle, NgClass, InfiniteScroll, RecommendationsComponent],
	styles: [
		`.forever-scroll {
			height: auto;
			overflow: hidden;
		}`
	],
  providers:[RecommendationService],
})

export class ExpressionTabComponent{
  display='none';
  class = 'menu-icon icon-plus';
  expression = "spanish";
	@Output() items: any;

  constructor(private service: RecommendationService){
    this.service.getInformations().then(info => this.items = info);
  }

  openInstruments()  {
    this.display = this.display.match('none') ? 'inline' : 'none' ;
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus' ;
  }

  onScroll () {
    this.service.getMoreInformation().then(info => this.items = info);
	  console.log('scrolled!!');
	}
}
