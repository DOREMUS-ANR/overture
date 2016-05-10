import {Injectable} from '@angular/core';
import {Http, RequestOptions, Request} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QueriesService {
  public query;
  http: Http;
  constructor(http:Http) {
    this.http = http;
  }

  load(id, prop, val){
    var options = new RequestOptions({
      search: 'id=' + id + '&' +
      'prop=' + prop + '&' +
      'val=' + val
    });
    // FIXME relative URL
    return this.http.get("../api/query", options)
      .map(res => res.json());
  }
}
