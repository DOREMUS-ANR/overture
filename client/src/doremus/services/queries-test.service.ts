import {Injectable} from 'angular2/core';
import {Http, RequestOptions, Request} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QueriesService {
  public query;
  http: Http;
  constructor(http:Http) {
    this.http = http;
  }

  load(id){
    var options = new RequestOptions({
      search: 'id=' + id
    });
    // FIXME relative URL
    return this.http.get("/api/query", options)
      .map(res => res.json());
  }
}
