import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PerformanceService {
  private limit = 12;

  constructor(private http: HttpClient) { }

  query(filter = {}, offset?: number): Observable<Object> {
    let filterOptions = "";

    Object.keys(filter).forEach(k => {
      let value = filter[k];
      if (!value) return;
      if (!Array.isArray(value)) value = [value]
      for (let v of value)
        filterOptions += `&${k}=${v}`
    });

    let search = 'lim=' + this.limit + filterOptions;
    if (offset) search += '&offset=' + offset;

    return this.http.get('/api/performance', {
      params: new HttpParams({ fromString: search })
    });
  }

  get(id): Observable<any> {
    if (!id) return null;

    let params = new HttpParams().set('lang', Globals.lang);
    return this.http.get(`/api/performance/${id}`, {params});

  }

  // recommend(id) {
  //   if (!id) return Promise.resolve(null);
  //
  //   let params = new HttpParams().set('lang', Globals.lang);
  //   return this.http.get(`/api/recommendation/${id}`, { params })
  //     .toPromise().then(res => {
  //       let data = res;
  //       console.log(data);
  //       return data;
  //     });
  // }

}
