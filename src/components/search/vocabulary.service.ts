import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Globals } from '../../app.globals';

let vocabularies = {};

@Injectable()
export class VocabularyService {
  constructor(private http: HttpClient) { }

  get(id): Observable<any> {
    if (!id) return Observable.of(null);

    let cache = vocabularies[id];
    if (cache) return Observable.of(cache);

    let params = new HttpParams().set('lang', Globals.lang);
    return this.http.get<any>(`/api/vocabulary/${id.replace(/\//g, '-')}`, { params })
      .map(res => {
        vocabularies[id] = res;
        return res
      });
  }

  lemma(vocabulary: string, id: string): any {
    let params = new HttpParams()
      .set('lang', Globals.lang)
      .set('lemma', id);
    return this.http.get<any>(`/api/vocabulary/${vocabulary}`, { params })
      .map(res => res && res[0]);
  }

  search(vocabulary: string, q: string): any {
    let params = new HttpParams()
      .set('lang', Globals.lang)
      .set('autocomplete', 'true')
      .set('q', q);

    return this.http.get<any>(`/api/vocabulary/${vocabulary}`, { params });
  }
}
