import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  query(input = {}, offset?: number) {
    let params = new HttpParams().set('lang', Globals.lang);
    if (offset) params = params.set('offset', offset + '');

    return this.http.get<any>(`/api/search/${input}`, {params})
      .toPromise().then(res => {
        let data = res;

        for (let d of data) {
          d.id = /[^/]*$/.exec(d.expression)[0];
          d.title = Array.isArray(d.title) ? d.title[0] : d.title;
        }

        return data;
      });
  }

}
