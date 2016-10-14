import { INFORMATION } from '../components/auxExpressions';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class QueryService {
  end: number;

  constructor(private http: Http) {
    this.end = 20;
  }

  getInformations(id, items) {
    this.end = 10;
    var filterOptions = "";

    if (items && items[0]) {
      filterOptions = '&key=' + items[0];
    }
    if (items && items[1]) {
      filterOptions += '&genre=' + items[1];
    }
    if (items && items[2]) {
      filterOptions += '&title=' + items[2];
    }

    var options = new RequestOptions({
      search: 'id=' + id + '&lim=' + this.end + filterOptions
    });

    return this.http.get("../api/query", options).toPromise().then(res => res.json());
  }

  getMoreInformation(id, items) {
    this.end += 10;
    var filterOptions = "";
    if (items && items[0]) {
      filterOptions = '&key=' + items[0];
    }
    if (items && items[1]) {
      filterOptions += '&genre=' + items[1];
    }
    if (items && items[2]) {
      filterOptions += '&title=' + items[2];
    }
    var options = new RequestOptions({
      search: 'id=' + id + '&' +
      'lim=' + this.end +
      filterOptions
    });
    // FIXME relative URL
    return this.http.get("../api/query", options)
      .toPromise().then(res => res.json());
  }

  getInformation(id, uri, lang) {
    if(!uri) return null;
    var options = new RequestOptions({
      search: 'id=' + id + '&' +
      'uri=' + uri + '&' +
      'lang=' + lang
    });
    // FIXME relative URL
    return this.http.get("../api/query", options)
      .toPromise().then(res => res.json());
  }

}
