import { Component } from '@angular/core';
import { ExpressionService } from './expression.service';
import { SharedService } from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';

const PERFORMANCE = 'MusicEvent';
const PUBLICATION = 'PublicationEvent';

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
    private route: ActivatedRoute, private _sanitizer: DomSanitizer) {

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
          let premiere = perfs && perfs.find(ev => ev.firstPerformance);
          if (premiere)
            this.dates.push({
              type: 'premiere',
              description: premiere.note,
              date: premiere.startDate
            });

          let pubs = this.expression.events[PUBLICATION];
          let princepsPub = pubs && pubs.find(ev => ev.firstPublication);
          if (princepsPub)
            this.dates.push({
              type: 'publication',
              description: princepsPub.note,
              date: princepsPub.startDate
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
    // console.log(s)
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
    if (!v) return asArray ? [] : null;
    if (asArray && !Array.isArray(v)) return [v];
    return v;
  }

  getId(uri) {
    return uri.split('/').slice(-1)[0];
  }

  startsWithNum(what) {
    return parseInt(what[0]) != NaN;
  }

  safePic(input) {
    let uri = encodeURI(input);
    return this._sanitizer.bypassSecurityTrustStyle(`url('${uri}')`);
  }
}
