import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {
  private limit = 12;

  constructor(private http: Http, private globals: Globals) { }

  query(input = {}, offset?: number) {
    let search = `lang=${this.globals.lang}`;
    if (offset) search += '&offset=' + offset;

    return this.http.get(`/api/search/${input}`, new RequestOptions({ search }))
      .toPromise().then(res => {
        let data = res.json();

        for (let d of data) {
          d.id = /[^/]*$/.exec(d.expression)[0];
          d.title = Array.isArray(d.title) ? d.title[0] : d.title;
        }

        return data;
      });
  }

}
