import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, RequestOptions } from '@angular/http';
import { Globals } from '../../app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExpressionService {
  private limit = 12;

  constructor(private http: Http, private globals: Globals) { }

  query(filter = {}, offset?: number) {
    let filterOptions = "";

    Object.keys(filter).forEach(k => {
      if (filter[k])
        filterOptions += `&${k}=${filter[k]}`
    });

    let search = 'id=selfContainedExpressions&lim=' + this.limit + filterOptions;
    if (offset) search += '&offset=' + offset;

    return this.http.get("../api/query", new RequestOptions({ search })).toPromise().then(res => {
      let data = this._processResult(res);

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
        let data = this._processResult(res);
        data = this._mergeData(data);
        return data[0];
      });
  }

  _mergeData(data) {
    let output = {};

    for (let row of data) {
      Object.keys(row).forEach(prop => {
        let value = row[prop];

        if (!output[prop]) {
          output[prop] = [value];
        } else if (prop == 'keyURI'){
          //FIXME workaround for key in @en-gb and @en-us
          if(output['key'].length > output['keyURI'].length)
            output[prop].push(value)
        } else if (!output[prop].includes(value)) {
          output[prop].push(value)
        }
      });
    }
    return [output];
  }

  _processResult(res) {
    let bindings = res.json().results.bindings;
    bindings.forEach(b => {
      Object.keys(b).forEach(prop => {
        b[prop] = b[prop].value;
      });
    });
    return bindings;
  }
}
