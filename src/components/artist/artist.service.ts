import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {
  private limit = 21;

  constructor(private http: HttpClient, private globals: Globals) { }

  query(filter = {}, offset?: number) {
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

    return this.http.get("/api/artist", {
      params: new HttpParams({ fromString: search })
    });
  }

  get(id): Observable<any> {
    if (!id) return null;

    let params = new HttpParams().set('lang', Globals.lang);
    return Observable.forkJoin(
      this.http.get(`/api/artist/${id}`, params)
      // this.http.get(`/api/expression/${id}/realisations`, new RequestOptions({ search }))
    )
      .map(res => res[0]);
    //       let expression = _mergeData(_processResult(res[0]));
    //       let eventsData = _processResult(res[1]);
    //       let events = {};
    //       eventsData.forEach((e) => {
    //         e.id = e.event;
    //         // init array for the current category if it does not exist
    //         if (!events[e.class]) events[e.class] = [];
    //         // retrieve event with the same id
    //         let evt = events[e.class].find(evt => evt.id == e.id);
    //         if (!evt) {
    //           evt = {};
    //           events[e.class].push(evt);
    //         };
    //
    //         Object.assign(evt, e);
    //         if (!evt.activities) evt.activities = [];
    //
    //         evt.activities.push({
    //           actor: e.actorName || e.actor,
    //           function: e.function,
    //           mop: e.mop
    //         });
    //       });
    //
    //       for (let key of Object.keys(events))
    //         events[key].sort((a, b) => a.time >= b.time ? 1 : -1);
    //
    //       console.log(events)
    //       expression.events = events;
    //       return expression;
    //     });
  }

}
