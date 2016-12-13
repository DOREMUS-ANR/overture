import {Component, Input} from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_["default"];

declare var __moduleName: string;

function toTimeSpan(str: String) {
  let [start, end] = str.split('/');
  return {
    start: moment(start),
    end: moment(end)
  }
}

@Component({
  moduleId: __moduleName,
  templateUrl: 'timeline.template.html',
  selector: 'timeline'
})
export class TimelineComponent {
  @Input() dates: [any];

  ngOnInit() {
    if (!this.dates) return;
    this.dates.forEach((d) => {
      d.time = toTimeSpan(d.date);
      if(!d.agent) d.agent = [];
    });
    console.log(this.dates)
  }
}
