import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

import {SharedService} from '../../services/sharedService.service';
import {QueryService} from '../../services/queries.service';
import {Globals } from '../../app.globals';
import {ExpressionService} from './expression.service';

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
    individualWork = null, complexWork = null, expCreation = null, composer = null, casting = null, castingNotes = []) {
    this.title = title;
    this.key = key;
    this.keyURI = keyURI;
    this.genre = genre;
    this.genreURI = genreURI;
    this.opus = opus;
    this.note = note;
    this.catalogue = catalogue;
    this.individualWork = individualWork;
    this.complexWork = complexWork;
    this.expCreation = expCreation;
    this.composer = composer;
    this.casting = casting;
    this.castingNotes = castingNotes;
  }
}

@Component({
  moduleId: __moduleName,
  templateUrl: 'expression.list.template.html',
  styleUrls: ['expression.css'],
  providers: [QueryService, ExpressionService]
})

export class ExpressionListComponent {
  @Input() expressionURI: string;

  @Output() items: any[];

  display = 'none';
  class = 'menu-icon icon-plus';
  displayDiscover = 'none';
  classDiscover = 'menu-icon icon-plus';
  expression: Expression;
  search: boolean = false;
  filter: Array<string>;
  sharedService: SharedService

  private scrollInProgress = false;

  constructor(private _service: QueryService,
    private _expressionService: ExpressionService, sharedService: SharedService,
    private router: Router, private globals: Globals) {

    this.expressionURI = "<>";

    this.sharedService = sharedService;

    this.globals = globals;
  }

  onSearchClick(item) {
    this.search = item;
    //console.log("Search: " + this.search)
  }

  getList(filter = {}) {
    this._expressionService.query(filter).then(
      res => this.items = res,
      error => console.error('Error: ' + error)
    );
    this.expression = null;
  }
  ngOnInit() {
    this.getList();
    this._service.getInformation('selfContainedExpressionDet', this.expressionURI, null)
      .then(
      res => this.expression = this.queryBindExp(res),
      error => console.error('Error: ' + error)
      );
  }

  queryBindExp(query) {
    var bindings = query.results.bindings;
    var results: Expression;
    var binding = bindings[0];
    var expression = null;
    var result = new Expression;
    var lang = this.globals.lang || 'en';
    for (var i in bindings) {
      result.title = (bindings[i]["title"] != null) ?
        ((result.title == "") ? result.title.concat(bindings[i]["title"].value) : result.title.concat("- ", bindings[i]["title"].value))
        : result.title;
      if (bindings[i]["castingNote"] != null) {
        result.castingNotes.push(bindings[i]["castingNote"].value);
      }
    }
    if (binding != undefined) {
      result.keyURI = (binding["key"] != null) ? binding["key"].value : null;
      if (result.keyURI) {
        this._service.getInformation('vocabularyURI', "<" + result.keyURI + ">", lang)
          .then(
          query => result.key = query.results.bindings[0]["name"].value,
          error => console.error('Error: ' + error)
          );
      } else {
        result.key = (binding["keyID"] != null) ? binding["keyID"].value : null;
      }

      result.genreURI = (binding["genre"] != null) ? binding["genre"].value : null;
      if (result.genreURI != null) {
        this._service.getInformation('vocabularyURI', "<" + result.genreURI + ">", lang)
          .then(
          query => result.genre = query.results.bindings[0]["name"].value,
          error => console.error('Error: ' + error)
          );
      } else {
        result.genre = (binding["genreID"] != null) ? binding["genreID"].value : null;
      }
      result.opus = (binding["opusNote"] != null) ? binding["opusNote"].value : null;
      result.note = (binding["note"] != null) ? binding["note"].value : null;
      result.catalogue = (binding["catagNote"] != null) ? binding["catagNote"].value : null;
      result.individualWork = (binding["individualWork"] != null) ? binding["individualWork"].value : null;
      result.complexWork = (binding["complexWork"] != null) ? binding["complexWork"].value : null;
      result.expCreation = (binding["expCreation"] != null) ? binding["expCreation"].value : null;
      result.composer = (binding["composer"] != null) ? binding["composer"].value : null;

      result.casting = (binding["casting"] != null) ? binding["casting"].value : null;

      expression = result;
    }
    return expression;
  }

  openInstruments() {
    this.display = this.display.match('none') ? 'inline' : 'none';
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
  }

  openDiscover() {
    this.displayDiscover = this.displayDiscover.match('none') ? 'inline' : 'none';
    this.classDiscover = this.displayDiscover.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
  }

  onScroll() {
    if (this.scrollInProgress) return;
    this.scrollInProgress = true;
    this._expressionService.query(this.filter, this.items.length)
      .then(
      res => {
        this.scrollInProgress = false;
        this.items.push(...res);
      },
      error => console.error('Error: ' + error)
      );
  }

  myIdChange(event) {
    this.expressionURI = '<' + event.value + '>';
    this.ngOnInit();
    window.scrollTo(0, 0);
  }

  wip() {
    this.router.navigate(['/wip']);
  }
}
