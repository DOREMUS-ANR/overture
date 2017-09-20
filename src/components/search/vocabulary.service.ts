import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Globals } from '../../app.globals';

let vocabularies = {};

@Injectable()
export class VocabularyService {
  private limit = 12;

  constructor(private http: HttpClient) { }

  get(id): Observable<any> {
    if (!id) return Observable.of(null);

    let cache = vocabularies[id];
    if (cache) return Observable.of(cache);

    let params = new HttpParams().set('lang', Globals.lang);
    return this.http.get<any>(`/api/vocabulary/${id.replace(/\//g, '-')}`, params)
      .map(res => {
        let data = res && res.results && res.bindings;

        vocabularies[id] = data;
        return data.sort((a, b) => a.label.value.toLowerCase() > b.label.value.toLowerCase() ? 1 : -1);
      });
  }

}
