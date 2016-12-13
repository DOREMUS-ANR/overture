import {Component} from '@angular/core';
import {ExpressionService} from './expression.service';
import {SharedService} from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var __moduleName: string;

const frenchDateRegex = /(1er|[\d]{1,2}) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) (\d{4})/;

@Component({
  moduleId: __moduleName,
  templateUrl: 'expression.detail.template.html',
  styleUrls: ['expression.css'],
  providers: [ExpressionService]
})
export class ExpressionDetailComponent {
  sharedService: SharedService;
  expression: any;
  recommendation: [any];
  querying: boolean;
  dates: any[];

  constructor(sharedService: SharedService,
    private expressionService: ExpressionService,
    private route: ActivatedRoute) {

    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.querying = true;
        this.expressionService.get(id).then(exp => {
          this.expression = exp;
          console.log(this.expression);
          this.querying = false;

          // prepare dates for timeline
          this.dates = [];
          if (this.expression.creationTime) {
            this.dates.push({
              type: 'creation',
              agent: this.expression.composer,
              date: this.expression.creationTime[0]
            });
          }
          if (this.expression.premiere) {
            this.dates.push({
              type: 'premiere',
              description: this.expression.premiereNote,
              date: frenchDateRegex.exec(this.expression.premiereNote)[0]
            });
          }
          if (this.expression.publicationEvent) {
            let note = this.expression.publicationEventNote[0];
            let yearRegex = /d{4}/
            this.dates.push({
              type: 'publication',
              description: note,
              date: yearRegex.exec(note.substring(note.length - 4))
            });
          }
        });
        // retrieve recommendations
        this.expressionService.recommend(id)
          .then((res) => this.recommendation = res);

        // FIXME discover why this is not propagated to sharedService
        this.sharedService.sharchBarVisible = false;
      }
    });
  }

  isNode(a) {
    return a.startsWith('node');
  }

}
