import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {RecommendationService} from "../../services/recommendations.service";

declare var __moduleName: string;

export class resultQ {
  value: string;
  type: string;
  constructor(value, type)
  {
    this.value = value;
    this.type = type;
  }
}

export class Vocabulary {
  id: string;
  name: string;
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

@Component({
  moduleId: __moduleName,
  selector: 'queries-test',
  templateUrl: 'queries-test.template.html',
  providers: [RecommendationService],
  directives: [ROUTER_DIRECTIVES]
})

export class QueriesTestComponent {
   query: number;
   queryResult: resultQ[];
   queriesService: RecommendationService;
   items: Vocabulary[];

   constructor(_queriesService: RecommendationService) {
    this.queriesService= _queriesService;
    this.query = 0;
    var result1 = new resultQ('prueba1','tipo1');
    var result2 = new resultQ('prueba2','tipo2');
    this.queryResult = [result1, result2];

    this.queriesService.getInformation('vocabulary', "<http://data.doremus.org/vocabulary/key>", 'fr')
      .subscribe(
        queryVoc => this.items = this.queryBindVoc(queryVoc),
        error => console.error('Error: ' + error)
      );
    }

    loadQuery(sel) {
      this.queriesService.getInformation('searchQuery', "<"+sel+">",null)
      .subscribe(
        query => this.queryResult = this.queryBind(query),
        error => console.error('Error: ' + error)
      );
    }

    queryBind(query) {
      var bindings = query.results.bindings;
      var results: resultQ[] = [];
      for(var i in bindings) {
        var binding = bindings[i];
        for(var n in binding){
          var result = new resultQ(binding[n].value, binding[n].type);
          results.push(result);
        }
      }
      return results;
    }

    queryBindVoc(query) {
      var bindings = query.results.bindings;
      var results: Vocabulary[] = [];
      for(var i in bindings) {
        var binding = bindings[i];
        var result = new Vocabulary(binding["uri"].value, binding["label"].value);
        results.push(result);
      }
      return results;
    }
}
