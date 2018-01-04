import {Component, Input} from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_["default"];

const months = [
  { fr: 'janvier', en: 'january' },
  { fr: 'février', en: 'february' },
  { fr: 'mars', en: 'march' },
  { fr: 'avril', en: 'april' },
  { fr: 'mai', en: 'may' },
  { fr: 'juin', en: 'june' },
  { fr: 'juillet', en: 'july' },
  { fr: 'août', en: 'august' },
  { fr: 'septembre', en: 'september' },
  { fr: 'octobre', en: 'october' },
  { fr: 'novembre', en: 'november' },
  { fr: 'décembre', en: 'december' }
];

function toTimeSpan(str: String) {
  if (!str) return null;

  for (let m of months) {
    str = str.replace(m.fr, m.en);
  }

  let [start, end] = str.split('/');
  return {
    start: moment(start),
    end: moment(end)
  }
}

@Component({
  moduleId: module.id,
  templateUrl: './timeline.template.html',
  selector: 'timeline'
})
export class TimelineComponent {
  @Input() dates: [any];

  ngOnChanges() {
    if (!this.dates) return;

    this.dates.forEach((d) => {
      d.time = new Date(d.date);
      if (!d.agent) d.agent = [];
    });

    this.dates.sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time - b.time;
    });
  }
}
