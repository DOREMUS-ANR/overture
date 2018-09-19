import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PerformanceService {
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

    let search = 'lim=' + this.limit + filterOptions;
    if (offset) search += '&offset=' + offset;
    else this.expressions = [];

    return this.http.get("/api/performance", {
      params: new HttpParams({ fromString: search })
    });
  }

  get(id): Observable<any> {
    if (!id) return null;

    let params = new HttpParams().set('lang', Globals.lang);
    return Observable.forkJoin(
      this.http.get(`/api/expression/${id}`, {params}),
      this.http.get(`/api/expression/${id}/realisations`, {params}))
      .map(res => {
        let expression = _mergeData(_processResult(res[0]));
        let eventsData = _processResult(res[1]);
        let events = {};
        eventsData.forEach((e) => {
          e.id = e.event;
          // init array for the current category if it does not exist
          if (!events[e.class]) events[e.class] = [];
          // retrieve event with the same id
          let evt = events[e.class].find(evt => evt.id == e.id);
          if (!evt) {
            evt = {};
            events[e.class].push(evt);
          };

          Object.assign(evt, e);
          if (!evt.activities) evt.activities = [];

          evt.activities.push({
            actor: e.actorName || e.actor,
            function: e.function,
            mop: e.mop
          });
        });

        for (let key of Object.keys(events))
          events[key].sort((a, b) => a.time >= b.time ? 1 : -1);

        expression.events = events;
        return expression;
      });
  }

  recommend(id) {
    if (!id) return Promise.resolve(null);

    let params = new HttpParams().set('lang', Globals.lang);
    return this.http.get(`/api/recommendation/${id}`, {params})
      .toPromise().then(res => {
        let data =  res;
        console.log(data);
        return data;
      });
  }

}

function _mergeData(data): any {
  let output = {};

  for (let row of data) {
    Object.keys(row).forEach(prop => {
      let value = row[prop];

      if (!output[prop]) {
        output[prop] = [value];
      } else if (!output[prop].includes(value)) {
        output[prop].push(value)
      }
    });
  }
  return output;
}

function _processResult(res) {
  let bindings = res.results.bindings;
  bindings.forEach(b => {
    Object.keys(b).forEach(prop => {
      b[prop] = b[prop].value;
    });
  });
  return bindings;
}
