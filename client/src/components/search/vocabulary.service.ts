import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, RequestOptions } from '@angular/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VocabularyService {
  private limit = 12;

  constructor(private http: Http, private globals: Globals) { }

  get(id) {
    if (!id) return Promise.resolve(null);

    let search = `lang=${this.globals.lang}`;
    return this.http.get(`/api/vocabulary/${id.replace(/\//g, '-')}`, new RequestOptions({ search }))
      .toPromise().then(res => {
        let data = res.json();
        data = data.results && data.results.bindings;

        return data;
      });
  }

}
