import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

import {SharedService} from '../../services/sharedService.service';
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
  providers: [ExpressionService]
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
  filter: any;
  sharedService: SharedService

  private scrollInProgress = false;

  constructor(
    private _expressionService: ExpressionService, sharedService: SharedService,
    private router: Router, private globals: Globals) {

    this.sharedService = sharedService;
    this.globals = globals;
  }

  getList(filter = {}, reload?: boolean) {
    this.filter = filter;
    this._expressionService.query(filter).then(
      res => this.items = res,
      error => console.error('Error: ' + error)
    );
    if (reload) //if i am filtering
      this.router.navigate(['/expression']);
  }

  ngOnInit() {
    this.getList();
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