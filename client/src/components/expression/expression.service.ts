import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExpressionService {
  private limit = 12;

  constructor(private http: Http) { }

  query(filter = {}, offset?: number) {
    let filterOptions = "";

    Object.keys(filter).forEach(k => {
      if (filter[k])
        filterOptions += `&${k}=${filter[k]}`
    });

    let search = 'id=selfContainedExpressions&lim=' + this.limit + filterOptions;
    if (offset) search += '&offset=' + offset;

    return this.http.get("../api/query", new RequestOptions({
      search: search
    })).toPromise().then(res => {
      var bindings = res.json().results.bindings;
      bindings.forEach(b => {
          Object.keys(b).forEach(prop => {
              b[prop] = b[prop].value;
          });
      });
      return bindings;
    });
  }

  get(id) {
    if (!id) return null;

    // getMoreInformation(id, items) {
    //   this.end += 10;
    //   var filterOptions = "";
    //   if (items && items[0]) {
    //     filterOptions = '&key=' + items[0];
    //   }
    //   if (items && items[1]) {
    //     filterOptions += '&genre=' + items[1];
    //   }
    //   if (items && items[2]) {
    //     filterOptions += '&title=' + items[2];
    //   }
    //   var options = new RequestOptions({
    //     search: 'id=' + id + '&' +
    //     'lim=' + this.end +
    //     filterOptions
    //   });
    //   // FIXME relative URL
    //   return this.http.get("../api/query", options)
    //     .toPromise().then(res => res.json());
    // }

  }

}
