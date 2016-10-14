import {Component} from '@angular/core';
import {ExpressionService} from './expression.service';
import {SharedService} from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: 'expression.detail.template.html',
  styleUrls: ['expression.css'],
  providers: [ExpressionService]
})
export class ExpressionDetailComponent {
  sharedService: SharedService;
  expression: any;

  constructor(sharedService: SharedService,
    private expressionService: ExpressionService,
    private route: ActivatedRoute) {

    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.expressionService.get(id).then(exp => { this.expression = exp; console.log(this.expression); });
        // FIXME discover why this is not propagated to sharedService
        this.sharedService.sharchBarVisible = false;
      }
    });
  }

}
