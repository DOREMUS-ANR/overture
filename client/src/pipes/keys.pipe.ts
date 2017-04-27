import { PipeTransform, Pipe } from '@angular/core';

// Object to Array for ngFor on properties
// from http://stackoverflow.com/questions/35534959/access-key-and-value-of-object-using-ngfor#answer-35536052

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
