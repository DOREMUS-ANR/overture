import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'expression-summary',
  templateUrl: './expression.summary.template.html'
})

export class ExpressionSummaryComponent {
  @Input() expression: {};
}
