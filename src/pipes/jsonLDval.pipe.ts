import { PipeTransform, Pipe } from '@angular/core';
import * as bestLang from 'bestlang';
import { Globals } from '../app.globals';

var supportedLanguages = [Globals.lang, 'en', 'ru-Latn', 'el-Latn'];

@Pipe({ name: 'jsonLDval' })
export class JsonLDvalPipe implements PipeTransform {
  transform(value, args: string[] = []): any {
    if (!value) return '';
    let opt = {
      lang: false,
      array: false
    };

    if (!Array.isArray(args)) args = [args];
    for (let arg of args) opt[arg] = true;

    let a = clone(value);
    if (!Array.isArray(a)) a = [a];

    let bl = bestLang(a.map(v => v['@language'] || ''), supportedLanguages, 'en');
    let best;
    if (bl) best = a.find(v => v['@language'] == bl);
    if (!best) best = a.find(v => !v['@language']);

    a = a.map(v => flatObj(v, opt));

    if (opt.array) return a.join(' | ')
    return flatObj(best, opt) || a[0];
  }
}

function flatObj(v, opt) {
  if (!v) return null;
  if (opt.lang && v['@language'])
    return v['@value'] + `<small class='lang'>${v['@language']}</small>`
  return v['@value'] || v;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
