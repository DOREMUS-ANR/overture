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

  constructor(private http: Http, private globals: Globals) { }

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

  get(id) {
    if (!id) return Promise.resolve(null);

    let search = `lang=${this.globals.lang}`;
    return this.http.get(`/api/expression/${id}`, new RequestOptions({ search }))
      .toPromise().then(res => {
        let data = _mergeData(_processResult(res));
        return data;
      });
  }

  recommend(id) {
    if (!id) return Promise.resolve(null);

    let search = `lang=${this.globals.lang}`;
    return this.http.get(`/api/recommendation/${id}`, new RequestOptions({ search }))
      .toPromise().then(res => {
        let data = res.json();
        console.log(data);
        return data;
      });
  }

}

function _mergeData(data) {
  let output = {};

  for (let row of data) {
    Object.keys(row).forEach(prop => {
      let value = row[prop];

      if (!output[prop]) {
        output[prop] = [value];
      } else if (prop == 'keyURI') {
        //FIXME workaround for key in @en-gb and @en-us
        if (output['key'].length > output['keyURI'].length)
          output[prop].push(value)
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
