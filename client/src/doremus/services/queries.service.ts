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

  getInformations(id, items){
    this.end = 10;
    var filterOptions = "";
    if(items != undefined && items[0]!= undefined) {
      filterOptions = '&' + 'key=' + items[0];
    }
    if(items != undefined && items[1]!= undefined) {
      filterOptions = filterOptions + '&' + 'genre=' + items[1];
    }
    var options = new RequestOptions({
      search: 'id=' + id + '&' +
      'lim=' + this.end + '&' +
      filterOptions
    });
    return this.http.get("../api/query", options)
      .map(res => res.json());
  }

  getMoreInformation(id, items){
      this.end += 10;
      var filterOptions = "";
      if(items != undefined && items[0]!= undefined) {
        filterOptions = '&' + 'key=' + items[0];
      }
      if(items != undefined && items[1]!= undefined) {
        filterOptions = filterOptions + '&' + 'genre=' + items[1];
      }
      var options = new RequestOptions({
        search: 'id=' + id + '&' +
        'lim=' + this.end  +
        filterOptions
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
