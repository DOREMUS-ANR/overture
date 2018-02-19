import { Injectable } from '@angular/core';

const latin_scripts = ', en;q=0.9, ru-Latn;q=0.2, grm-Latn;q=0.2, el-Latn;q=0.2 *;q=0.1';

Injectable()
export class Globals {
  static _lang = 'en';
  static get lang(){
    return this._lang + ', en;q=0.9, ru-Latn;q=0.2, grm-Latn;q=0.2, el-Latn;q=0.2 *;q=0.1'
  }
  static set lang(lang){
    this._lang = lang;
  }
}
