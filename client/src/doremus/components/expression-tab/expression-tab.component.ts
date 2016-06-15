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
  catalogue: string;
  individualWork: string;
  complexWork: string;
  expCreation: string;
  composer: string;
  casting: string;
  castingNotes: string[];

  constructor(title = "", key = null, keyURI = null, genre = null, genreURI = null, opus = null, note = null, catalogue = null,
              individualWork = null, complexWork = null, expCreation = null, composer = null, casting = null, castingNotes = [])
  {
    this.title= title;
    this.key= key;
    this.keyURI= keyURI;
    this.genre= genre;
    this.genreURI= genreURI;
    this.opus= opus;
    this.note= note;
    this.catalogue= catalogue;
    this.individualWork= individualWork;
    this.complexWork= complexWork;
    this.expCreation= expCreation;
    this.composer= composer;
    this.casting= casting;
    this.castingNotes= castingNotes;
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
  display ='none';
  class = 'menu-icon icon-plus';
  displayDiscover ='none';
  classDiscover = 'menu-icon icon-plus';
  @Input() expressionURI: string;
  expression: Expression;
  service: RecommendationService;
	@Output() items: RecommendationCardInfo[];
  queryResult: resultQ[];

  constructor(private _service: RecommendationService){
    this.service= _service;
    this.expressionURI = "<http://data.doremus.org/Self_Contained_Expression/F22/98dcb7cd-1acf-4d1e-92cd-6ab41c8b2ffd>";
  }
  ngOnInit(){
    this.service.getInformations('selfContainedExpressions')
        .subscribe(
          query => this.items = this.queryBind(query),
          error => console.error('Error: ' + error)
      );
    this.service.getInformation('selfContainedExpressionDet', this.expressionURI, null)
      .subscribe(
        res => this.expression = this.queryBindExp(res),
        error => console.error('Error: ' + error)
      );
  }
  queryBind(query) {
    var bindings = query.results.bindings;
    var results: RecommendationCardInfo[] = [];
    for(var i in bindings) {
      var binding = bindings[i];
      var result = new RecommendationCardInfo(binding["expressions"].value, binding["title"].value, (binding["composer"]!=null) ? binding["composer"].value : null);
      results.push(result);
    }
    return results;
  }
  queryBindExp(query) {
    var bindings = query.results.bindings;
    var results: Expression;
    var binding = bindings[0];
    var expression = null;
    var result = new Expression;
    var lang = "fr";
    for(var i in bindings){
      result.title = (bindings[i]["title"]!=null) ? result.title.concat("- ", bindings[i]["title"].value) : result.title;
      if(bindings[i]["castingNote"]!=null) {
        result.castingNotes.push(bindings[i]["castingNote"].value);
      }
    }
    if(binding != undefined)
    {
      result.keyURI = (binding["key"]!=null) ? binding["key"].value : null;
      if(result.keyURI!=null)
      {
        this.service.getInformation('vocabularyURI', "<"+result.keyURI+">", lang)
          .subscribe(
            query => result.key = query.results.bindings[0]["name"].value,
            error => console.error('Error: ' + error)
          );
      }else
      {
        result.key = (binding["keyID"]!=null) ? binding["keyID"].value : null;
      }

      result.genreURI = (binding["genre"]!=null) ? binding["genre"].value : null;
      if(result.genreURI!=null)
      {
        this.service.getInformation('vocabulary', "<"+result.genreURI+">", lang)
          .subscribe(
            query => result.genre = query.results.bindings[0]["name"].value,
            error => console.error('Error: ' + error)
          );
      }else
      {
        result.genre = (binding["genreID"]!=null) ? binding["genreID"].value : null;
      }
      result.opus = (binding["opusNote"]!=null) ? binding["opusNote"].value : null;
      result.note = (binding["note"]!=null) ? binding["note"].value : null;
      result.catalogue = (binding["catagNote"]!=null) ? binding["catagNote"].value : null;
      result.individualWork = (binding["individualWork"]!=null) ? binding["individualWork"].value : null;
      result.complexWork = (binding["complexWork"]!=null) ? binding["complexWork"].value : null;
      result.expCreation = (binding["expCreation"]!=null) ? binding["expCreation"].value : null;
      result.composer = (binding["composer"]!=null) ? binding["composer"].value : null;

      result.casting = (binding["casting"]!=null) ? binding["casting"].value : null;

      expression = result;
    }
    return expression;
  }
  openInstruments()  {
    this.display = this.display.match('none') ? 'inline' : 'none' ;
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus' ;
  }
  openDiscover()  {
    this.displayDiscover = this.displayDiscover.match('none') ? 'inline' : 'none' ;
    this.classDiscover = this.classDiscover.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus' ;
  }
  onScroll () {
    this.service.getMoreInformation('selfContainedExpressions')
      .subscribe(
        query => this.items = this.queryBind(query),
        error => console.error('Error: ' + error)
      );
	}
  myIdChange(event)  {
    this.expressionURI = '<' + event.value + '>';
    this.ngOnInit();
    window.scrollTo(0, 0);
  }
}
