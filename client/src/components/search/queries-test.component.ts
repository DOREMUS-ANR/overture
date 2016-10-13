import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {QueryService} from "../../services/queries.service";
import {Globals } from '../../app.globals';

declare var __moduleName: string;

export class resultQ {
  value: string;
  type: string;
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }
}

export class Vocabulary {
  id: string;
  name: string;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  moduleId: __moduleName,
  selector: 'queries-test',
  templateUrl: 'queries-test.template.html',
  providers: [QueryService, Globals]
})

export class QueriesTestComponent {
  query: number;
  queryResult: resultQ[];
  queriesService: QueryService;
  items: Vocabulary[];

  constructor(private _queriesService: QueryService, private globals: Globals) {
    this.query = 0;
    var result1 = new resultQ('prueba1', 'tipo1');
    var result2 = new resultQ('prueba2', 'tipo2');
    this.queryResult = [result1, result2];

    this._queriesService.getInformation('vocabulary', 'http://data.doremus.org/vocabulary/key/', globals.lang)
      .then(
      queryVoc => this.items = this.queryBindVoc(queryVoc),
      error => console.error('Error: ' + error)
      );
  }

  loadQuery(sel) {
    this._queriesService.getInformation('searchQuery', sel, null)
      .then(
      query => this.queryResult = this.queryBind(query),
      error => console.error('Error: ' + error)
      );
  }

  queryBind(query) {
    var bindings = query.results.bindings;
    var results: resultQ[] = [];
    for (var i in bindings) {
      var binding = bindings[i];
      for (var n in binding) {
        var result = new resultQ(binding[n].value, binding[n].type);
        results.push(result);
      }
    }
    return results;
  }

  queryBindVoc(query) {
    var bindings = query.results.bindings;
    var results: Vocabulary[] = [];
    for (var i in bindings) {
      var binding = bindings[i];
      var result = new Vocabulary(binding["uri"].value, binding["label"].value);
      results.push(result);
    }
    return results;
  }
}
