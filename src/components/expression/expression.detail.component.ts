import { Component } from '@angular/core';
import { ExpressionService } from './expression.service';
import { SharedService } from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

          if (this.expression.composerUri)
            this.expression.composerId = this.expression.composerUri.map(
              c => c.replace('http://data.doremus.org/artist/', '')
            );
          this.titleService.setTitle(exp.title[0]);

          console.log(this.expression);
          this.querying = false;
          this.error = false;

          // prepare dates for timeline
          this.dates = [];
          if (this.expression.creationStart)
            this.dates.push({
              type: 'creation',
              agent: this.expression.composer,
              date: this.expression.creationStart
            });
          if (this.expression.premiere)
            this.dates.push({
              type: 'premiere',
              description: this.expression.premiereNote,
              date: this.expression.premiereStart
            });
          if (this.expression.publicationEvent)
            this.dates.push({
              type: 'publication',
              description: this.expression.publicationEventNote,
              date: this.expression.publicationStart
            });

          this.overviewPic = this.expression.composerPic || defaultOverviewPic;

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
    let s = source[0].replace('http://data.doremus.org/', '');
    let org = null;
    switch (s) {
      case 'bnf':
        org = `BnF`; break;
      case 'philharmonie':
      case 'euterpe':
        org = `Philharmonie_de_Paris`; break;
      case 'redomi':
      case 'itema3':
        org = `Radio_France`; break;
    }
    return institutions[org];
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

}
