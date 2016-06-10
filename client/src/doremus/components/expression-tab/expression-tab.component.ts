import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {NgStyle, NgClass} from '@angular/common';
import {InfiniteScroll} from 'angular2-infinite-scroll/angular2-infinite-scroll';
import {RecommendationsComponent} from '../recommendations/recommendations.component';
import { RecommendationService } from '../../services/recommendations.service';
import {RecommendationCardInfo} from '../recommendations/cardInfo' ;
import {resultQ} from '../queries-test/queries-test.component' ;

declare var __moduleName: string;

export class Expression {
  title: string;
  key: string;
  keyURI: string;
  genre: string;
  genreURI: string;
  opus: string;
  note: string;

  constructor(title, key, keyURI, genre, genreURI, opus, note)
  {
    this.title= title;
    this.key= key;
    this.keyURI= keyURI;
    this.genre= genre;
    this.genreURI= genreURI;
    this.opus= opus;
    this.note= note;
  }
}

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

export class ExpressionTabComponent {
  display='none';
  class = 'menu-icon icon-plus';
  expressionURI = '<http://data.doremus.org/Self_Contained_Expression/F22/005b17e3-1606-4070-a080-f135ef984d00>';
  expression: Expression;
  service: RecommendationService;
	@Output() items: RecommendationCardInfo[];
  queryResult: resultQ[];

  constructor(private _service: RecommendationService){
    this.service= _service;

    this.service.getInformations('selfContainedExpressions')
      .subscribe(
        query => this.items = this.queryBind(query),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }
  ngOnInit(){
    this.service.getInformation('selfContainedExpressionDet', this.expressionURI)
      .subscribe(
        res => this.expression = this.queryBindExp(res),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }
  queryBind(query) {
    var bindings = query.results.bindings;
    var results: RecommendationCardInfo[] = [];
    for(var i in bindings) {
      var binding = bindings[i];
      var result = new RecommendationCardInfo(binding["expressions"].value, binding["title"].value,'');
      results.push(result);
    }
    return results;
  }
  queryBindExp(query) {
    var bindings = query.results.bindings;
    var results: Expression;
    var binding = bindings[0];
    console.log(binding);
    var result = new Expression(null,null,null,null,null,null,null);
    result.title = (binding["title"]!=null) ? binding["title"].value : null;
    result.key = (binding["key"]!=null) ? binding["key"].value : null;
    result.keyURI = (binding["keyURI"]!=null) ? binding["keyURI"].value : null;
    result.genre = (binding["genre"]!=null) ? binding["genre"].value : null;
    result.genreURI = (binding["genreURI"]!=null) ? binding["genreURI"].value : null;
    result.opus = (binding["opus"]!=null) ? binding["opus"].value : null;
    result.note = (binding["note"]!=null) ? binding["note"].value : null;
    return result;
  }
  openInstruments()  {
    this.display = this.display.match('none') ? 'inline' : 'none' ;
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus' ;
  }

  onScroll () {
    this.service.getMoreInformation('selfContainedExpressions')
      .subscribe(
        query => this.items = this.queryBind(query),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
	  console.log('scrolled!!');
	}
}
