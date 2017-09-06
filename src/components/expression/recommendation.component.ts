import { Component, Input, SimpleChanges } from '@angular/core';
import { ExpressionService } from './expression.service';

@Component({
  moduleId: module.id,
  selector: 'recommendation',
  templateUrl: './recommendation.template.html'
})
export class RecommendationComponent {
  @Input() seed: string;
  recommendation: [any];
  loading: boolean = true;
  error: boolean = false;

  constructor(private expressionService: ExpressionService) { };

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.seed) return;

    this.loading = true;
    this.error = false;
    this.recommendation = null;

    let id = this.seed.replace('http://data.doremus.org/expression/', '');
    // retrieve recommendations
    this.expressionService.recommend(id)
      .then((res) => {
        this.loading = false;
        this.recommendation = res.filter(r => r.data.length);
      }, (err) => {
        this.loading = false;
        this.error = true;
        console.error(err);
      });

  }
}
