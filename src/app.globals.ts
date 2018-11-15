import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

const latin_scripts = ', en;q=0.9, ru-Latn;q=0.2, grm-Latn;q=0.2, el-Latn;q=0.2 *;q=0.15';

@Injectable()
export class Globals {
  static _lang = 'en';
  static get lang() {
    return this._lang + latin_scripts
  }
  static set lang(lang) {
    this._lang = lang;
  }

  static getHttpParams() {
    return new HttpParams().set('lang', Globals.lang);
  }
}
