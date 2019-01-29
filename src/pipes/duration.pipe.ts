// modified from https://gist.github.com/darrenmothersele/b8f6216a190d811042c33f1cabbb7813
import { Pipe, PipeTransform } from '@angular/core';

const DURATION_PATTERN = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const leftPad = x => String(x).length >= 2 ? x : leftPad(`0${x}`);
    const match = value.match(DURATION_PATTERN);
    if (match) {
      const [_, hours, mins, secs] = match;
      return [hours || 0, mins || 0, secs || 0].map(leftPad).join(':');
    }

    return toHHMMSS(value);
  }
}

function toHHMMSS(value) {
  var sec_num = parseInt(value, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  let x = '';
  if (hours) x += hours + 'h '
  if (minutes) x += minutes + 'm '
  if (seconds) x += seconds + 's'
  return x.trim();
}
