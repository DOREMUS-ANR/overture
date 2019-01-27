import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {
  private limit = 41;

  constructor(private http: HttpClient) { }

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

  get(id, light = false): Observable<any> {
    if (!id) return null;
    let params = new HttpParams()
      .set('lang', Globals.lang);
    if (light)
      params = params.set('light', light.toString());

    return this.http.get(`/api/artist/${id}`, { params });
  }

  worksOf(id): Observable<any> {
    if (!id) return null;
    return this.http.get(`/api/artist/${id}/works`, { params: Globals.getHttpParams() });
  }

  performancesOf(id): Observable<any> {
    if (!id) return null;
    return this.http.get(`/api/artist/${id}/performances`, { params: Globals.getHttpParams() });
  }

  recommend(id, n = 3, weights: number[] = null, explain = true) {
    if (!id) return Promise.resolve(null);

    let params = new HttpParams()
      .set('lang', Globals.lang)
      .set('n', n.toString())
      .set('explain', explain.toString());

    if (weights) params = params.set('w', weights.join(','));
    return this.http.get(`/api/recommendation/artist/${id}`, { params })
      .toPromise().then(res => {
        let data = res;
        return data;
      });
  }


}
