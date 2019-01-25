import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin'

import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpressionService {
  expressions: any[];

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

    let search = `lim=${this.limit}&lang=${Globals.lang}` + filterOptions;
    if (offset) search += '&offset=' + offset;
    else this.expressions = [];

    return this.http.get("/api/expression", {
      params: new HttpParams({ fromString: search })
    });
  }

  get(id): Observable<any> {
    if (!id) return null;

    let params = new HttpParams().set('lang', Globals.lang);
    return forkJoin(
      this.http.get(`/api/expression/${id}`, { params }),
      this.http.get(`/api/expression/${id}/realisations`, { params }))
      .map(res => {
        let expression = res[0];
        if (Array.isArray(expression['name']))
          expression['name'] = expression['name'][0];

        let eventsData = res[1]['@graph'];
        let events = {};
        eventsData.forEach(e => {
          let cls = e['@type'];
          // init array for the current category if it does not exist
          if (!events[cls]) events[cls] = [];
          events[cls].push(e);
        });

        expression = Object.assign(expression, { events });
        return expression;
      });
  }

  recommend(id, n = 3) {
    if (!id) return Promise.resolve(null);

    let params = new HttpParams().set('lang', Globals.lang)
      .set('explain', 'false')
      .set('n', n.toString());
      
    return this.http.get(`/api/recommendation/${id}`, { params })
      .toPromise();
  }
}
