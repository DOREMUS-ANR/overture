import { Component } from '@angular/core';
import { ExpressionService } from './expression.service';
import { SharedService } from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

const PERFORMANCE = 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation';
const PUBLICATION = 'http://erlangen-crm.org/efrbroo/F30_Publication_Event';

const defaultOverviewPic = '/static/img/bg/generic-score.jpg';
const organizBase = 'http://data.doremus.org/organization/';
const institutions = {
  Philharmonie_de_Paris: {
    label: 'Philharmonie de Paris',
    img: '/static/img/logos/philharmonie.png',
    uri: 'https://philharmoniedeparis.fr'
  },
  BnF: {
    label: 'BnF',
    img: '/static/img/logos/bnf.png',
    uri: 'http://catalogue.bnf.fr/'
  },
  Radio_France: {
    label: 'Radio France',
    img: '/static/img/logos/radiofrance.flat.png',
    uri: 'http://www.radiofrance.fr/'
  }
}
@Component({
  moduleId: module.id,
  templateUrl: './expression.detail.template.html',
  styleUrls: ['./expression.styl'],
  providers: [ExpressionService]
})
export class ExpressionDetailComponent {
  sharedService: SharedService;
  expression: any;
  recommendation: [any];
  querying: boolean;
  dates: any[];
  error: boolean = false;
  overviewPic: string = defaultOverviewPic;

  constructor(private titleService: Title,
    sharedService: SharedService,
    private expressionService: ExpressionService,
    private route: ActivatedRoute) {

    this.sharedService = sharedService;

    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.querying = true;

        this.expressionService.get(id).subscribe(exp => {
          this.expression = exp;
          this.expression.id = id;
          this.expression.uri = 'http://data.doremus.org/expression/' + id;

          this.titleService.setTitle(exp.name);

          console.log(this.expression);
          this.querying = false;
          this.error = false;

          // prepare dates for timeline
          this.dates = [];
          if (this.expression.dateCreated)
            this.dates.push({
              type: 'creation',
              agent: this.getProp('composer', true).map(c => c.label),
              date: this.expression.dateCreated
            });

          let perfs = this.expression.events[PERFORMANCE];
          let premiere = perfs && perfs.find(ev => ev.isPremiere);
          if (premiere)
            this.dates.push({
              type: 'premiere',
              description: premiere.note,
              date: premiere.time
            });

          let pubs = this.expression.events[PUBLICATION];
          let princepsPub = pubs && pubs.find(ev => ev.isPrincepsPub);
          if (princepsPub)
            this.dates.push({
              type: 'publication',
              description: princepsPub.note,
              date: princepsPub.time
            });

          let firstComposer = this.getProp('composer', true)[0];
          this.overviewPic = (firstComposer && firstComposer.pic) || defaultOverviewPic;
        }, (err) => {
          this.querying = false;
          this.error = true;
          console.error(err);
        });

      }
    });
  }

  ngOnInit() {
    // FIXME discover why this is not propagated to sharedService
    this.sharedService.sharchBarVisible = false;
  }

  isNode(a) {
    return a.startsWith('node');
  }

  getSource(source) {
    let s = source
      .replace('http://data.doremus.org/', '')
      .replace('organization/', '');
    console.log(s)
    let org = null;
    switch (s) {
      case 'bnf':
      case 'BnF':
        org = `BnF`; break;
      case 'philharmonie':
      case 'Philharmonie_de_Paris':
      case 'euterpe':
        org = `Philharmonie_de_Paris`; break;
      case 'redomi':
      case 'itema3':
        org = `Radio_France`; break;
    }
    return institutions[org];
  }

  getProp(prop, asArray: boolean = false) {
    let v = this.expression[prop];
    if (!asArray && !v) return [];
    if (asArray && !Array.isArray(v)) return [v];
    return v;
  }

  getId(prop) {
    let x = prop ? this.expression[prop] : this.expression;
    if (!x) return null;
    return x.uri.split('/').slice(-1)[0];
  }

  class2Label(cls: string) {
    switch (cls) {
      case 'http://erlangen-crm.org/efrbroo/F31_Performance':
      case 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation':
        return 'Performance';
      case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
        return 'Publication'
      default: return cls;
    }
  }

  startsWithNum(what) {
    return parseInt(what[0]) != NaN;
  }
}
