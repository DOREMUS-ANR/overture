import { INFORMATION } from '../components/auxExpressions';
import { Injectable } from '@angular/core';
import { SummaryInfo } from '../components/summaryInfo';
import {Http, RequestOptions, Request} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryService {
  public query;
  http: Http;
  end: number;
  constructor(http:Http){
    this.end = 20;
    this.http = http;
  }

  getInformations(id) {
    var options = new RequestOptions({
      search: 'id=' + id + '&' +
      'lim=' + this.end + '&'
    });
    // FIXME relative URL
    return this.http.get("../api/query", options)
      .map(res => res.json());
  }

  getMoreInformation(id){
      this.end += 10;
      var options = new RequestOptions({
        search: 'id=' + id + '&' +
        'lim=' + this.end
      });
      // FIXME relative URL
      return this.http.get("../api/query", options)
        .map(res => res.json());
  }

  getInformation(id, uri, lang) {
    var options = new RequestOptions({
      search: 'id=' + id + '&' +
      'uri=' + uri + '&' +
      'lang=' + lang
    });
    // FIXME relative URL
    return this.http.get("../api/query", options)
      .map(res => res.json());
  }

}
