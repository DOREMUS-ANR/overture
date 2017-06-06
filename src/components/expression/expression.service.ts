import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, RequestOptions } from '@angular/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpressionService {
  expressions: any[];

  private limit = 12;

  constructor(private http: Http) { }

  query(filter = {}, offset?: number): Observable<any[]> {
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

    return this.http.get("/api/expression", new RequestOptions({ search }))
      .map(res => {
        let data = _processResult(res);

        for (let d of data)
          d.id = /[^/]*$/.exec(d.expression)[0];

        return data;
      });
  }

  get(id): Observable<any> {
    if (!id) return null;

    let search = `lang=${Globals.lang}`;
    return Observable.forkJoin(
      this.http.get(`/api/expression/${id}`, new RequestOptions({ search })),
      this.http.get(`/api/expression/${id}/realisations`, new RequestOptions({ search })))
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

        console.log(events)
        expression.events = events;
        return expression;
      });
  }

  recommend(id) {
    if (!id) return Promise.resolve(null);

    let search = `lang=${Globals.lang}`;
    return this.http.get(`/api/recommendation/${id}`, new RequestOptions({ search }))
      .toPromise().then(res => {
        let data = res.json();
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
  let bindings = res.json().results.bindings;
  bindings.forEach(b => {
    Object.keys(b).forEach(prop => {
      b[prop] = b[prop].value;
    });
  });
  return bindings;
}
