import {Component, Input} from '@angular/core';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'expression-summary',
  templateUrl: 'expression.summary.template.html'
})

export class ExpressionSummaryComponent {
  @Input() expression: {};
}
