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

        for (let evtType of Object.keys(events)) {
          events[evtType].sort((a, b) => a.time >= b.time ? 1 : -1);
          events[evtType].forEach(e => {
            if (!e.activities[0].actor)
              delete e.activities

            e.isPremiere = !!parseInt(e.isPremiere);
            e.isPrincepsPub = !!parseInt(e.isPrincepsPub);
          });
        }
        expression = Object.assign(expression, { events });
        return expression;
      });
  }

  recommend(id) {
    if (!id) return Promise.resolve(null);

    let params = new HttpParams().set('lang', Globals.lang)
      .set('explain', 'false');
    return this.http.get(`/api/recommendation/${id}`, { params })
      .toPromise();
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
