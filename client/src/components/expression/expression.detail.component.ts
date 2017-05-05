import {Component} from '@angular/core';
import {ExpressionService} from './expression.service';
import {SharedService} from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title }     from '@angular/platform-browser';

const organizBase = 'http://data.doremus.org/organization/';
const institutions = {
  Philharmonie_de_Paris: {
    label: 'Philharmonie de Paris',
    img: '/static/img/logos/philharmonie.png'
  },
  BnF: {
    label: 'BnF',
    img: '/static/img/logos/bnf.png'
  }
}
@Component({
  moduleId: module.id,
  templateUrl: './expression.detail.template.html',
  styleUrls: ['./expression.css'],
  providers: [ExpressionService]
})
export class ExpressionDetailComponent {
  sharedService: SharedService;
  expression: any;
  recommendation: [any];
  querying: boolean;
  dates: any[];
  error: boolean = false;

  constructor(private titleService: Title,
    sharedService: SharedService,
    private expressionService: ExpressionService,
    private route: ActivatedRoute) {

    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.querying = true;

        this.expressionService.get(id).subscribe(exp => {
          this.expression = exp;
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

        }, (err) => {
          this.querying = false;
          this.error = true;
          console.error(err);
        });
        // retrieve recommendations
        this.expressionService.recommend(id)
          .then((res) => this.recommendation = res, (err) => {
            this.error = true;
            console.error(err);
          });

        // FIXME discover why this is not propagated to sharedService
        this.sharedService.sharchBarVisible = false;
      }
    });
  }

  isNode(a) {
    return a.startsWith('node');
  }

  getSource(source) {
    if (Array.isArray(source)) source = source[0];

    if (!source.startsWith(organizBase)) return null;

    let inst = source.replace(organizBase, '');
    return institutions[inst];
  }

  class2Label(cls: string) {
    switch (cls) {
      case 'http://erlangen-crm.org/efrbroo/F31_Performance':
        return 'Performance';
      case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
        return 'Publication'
      default: return cls;
    }
  }

}
