import { Component, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { ExpressionService } from './expression.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private expressionService: ExpressionService, @Inject(PLATFORM_ID) private platformId: string) { };

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.seed) return;

    this.loading = true;
    this.error = false;
    this.recommendation = null;

    let id = this.seed.replace('http://data.doremus.org/expression/', '');

    if (!isPlatformBrowser(this.platformId)) return;

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
}
