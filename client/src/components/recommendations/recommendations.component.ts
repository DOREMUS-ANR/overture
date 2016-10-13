import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

import {RecommendationCardInfo} from '../recommendations/cardInfo';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'infinite-list',
  templateUrl: 'recommendations.template.html',
  styleUrls: ['recommendations.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecommendationsComponent {
  @Input() items: RecommendationCardInfo[];
  @Output() change = new EventEmitter();

  constructor() { }

  goToExpression(item) {
    console.log(item)
    this.change.emit({ value: item.id })
    //console.log("Selected: " + item.id);
  }
}
