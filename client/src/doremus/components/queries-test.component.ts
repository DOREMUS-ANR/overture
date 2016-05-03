import {Component} from 'angular2/core';
import {QueriesService} from "../services/queries-test.service";

export class resultQ{
  value: string;
  type: string;
  constructor(value, type)
  {
    this.value = value;
    this.type = type;
  }
}

@Component({
  selector: 'queries-test',
  template: `
  <br>
  <br>
  <div class='square-box' [style.background]="'rgb(155, 186, 114)'" [style.color]="'black'">
    <div class='square-content' style="margin:100px;">
      <button (click)="loadQuery(1);">Make query 1</button>
      <button (click)="loadQuery(2);">Make query 2</button>
      <p id='query'>Query: {{query}}</p>
      <p>Result</p>
      <ul [style.background]="'white'">
        <li *ngFor="let result of queryResult">
          <span>Value: {{result.value}}</span>
          <span>Type: {{result.type}}</span>
        </li>
      </ul>
    </div>
  </div>
  `,
  providers: [QueriesService]
})

export class QueriesTestComponent {
   query: number;
   queryResult: resultQ[];
   queriesService: QueriesService;

   constructor(_queriesService: QueriesService) {
    this.queriesService= _queriesService;
    this.query = 0;
    var result1 = new resultQ('prueba1','tipo1');
    var result2 = new resultQ('prueba2','tipo2');
    this.queryResult = [result1, result2];
    }

    loadQuery(id) {
      this.query = id;
      this.queriesService.load('queryTest')
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
}
