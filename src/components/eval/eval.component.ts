import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ExpressionService } from '../expression/expression.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'eval',
  templateUrl: './eval.template.html',
  providers: [ExpressionService]
})
export class EvaluationComponent {
  seed: string;
  expression: any;
  recommendation: Array<any>;
  loading: boolean = true;
  error: boolean = false;

  constructor(private expressionService: ExpressionService, @Inject(PLATFORM_ID) private platformId: string) {
    this.seed = "http://data.doremus.org/expression/d72301f0-0aba-3ba6-93e5-c4efbee9c6ea"
    if (isPlatformBrowser(this.platformId)) this.changeSeed();
  }

  changeSeed() {
    this.loading = true;
    this.error = false;
    this.recommendation = null;

    let id = this.seed.replace('http://data.doremus.org/expression/', '');
    this.expressionService.get(id).subscribe(exp => {
      this.expression = exp;
      this.expression.id = id;
      this.expression.composer = this.getProp('composer', true)[0];
      console.log(this.expression)
    });

    // retrieve recommendations
    this.expressionService.recommend(id)
      .then(res => {
        this.loading = false;
        this.recommendation = res;
      }).catch(err => {
        this.loading = false;
        this.error = true;
        console.error(err);
      });

  }

  getProp(prop, asArray: boolean = false) {
    let v = this.expression[prop];
    if (!v) return asArray ? [] : null;
    if (asArray && !Array.isArray(v)) return [v];
    return v;
  }


}
