import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'stripDbpedia' })
export class StripDbpediaPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) return value;
    return value.replace('http://dbpedia.org/resource/', '');
  }
}
