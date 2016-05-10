import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {QueriesService} from "../../services/queries-test.service";

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
  id: number;
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
  providers: [QueriesService]
})

export class QueriesTestComponent {
   query: number;
   queryResult: resultQ[];
   queriesService: QueriesService;
   items: Vocabulary[];

   constructor(_queriesService: QueriesService, private router:Router) {
    this.queriesService= _queriesService;
    this.query = 0;
    var result1 = new resultQ('prueba1','tipo1');
    var result2 = new resultQ('prueba2','tipo2');
    this.queryResult = [result1, result2];

    this.queriesService.load('queryVoc', '', '')
      .subscribe(
        queryVoc => this.items = this.queryBindVoc(queryVoc),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
    }

    loadQuery(id) {
      this.query = id;
      //alert(this.query);
      this.queriesService.load('queryTest', '<http://data.doremus.org/ontology/U11_has_key>',this.query)
      .subscribe(
        query => this.queryResult = this.queryBind(query),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
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
        var result = new Vocabulary(binding["concept"].value, binding["label"].value);
        results.push(result);
      }
      return results;
    }

    goToMain() {
      this.router.navigate(['/']);
    }

}
