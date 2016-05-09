import {Component} from 'angular2/core';
import {QueriesService} from "../services/queries-test.service";
import {Router} from 'angular2/router';

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
  selector: 'queries-test',
  template: `
  <div class='square-box' [style.background]="'rgb(155, 186, 114)'" [style.color]="'black'" style="height:auto;">
    <div class='square-content' style="margin:50px; height:auto;">
      <p id='query'>Query: {{query}}</p>
      <select #sel [style.backgorund]="'yellow'" name="singleSelect" (change)="loadQuery(sel.value)">
            <option value="noSel">Select ...</option>
            <option value="{{item.name}}" *ngFor="#item of items">{{item.name}}</option>
      </select><br>
      <p>Result</p>
      <ul [style.background]="'white'">
        <li *ngFor="#result of queryResult">
          <form>
            <div class="form-group">
              <p>Value:</p>
              <input type="text" value={{result.value}}>
            </div>
            <div class="form-group">
              <p>Type:</p>
              <input type="text" value={{result.type}}>
            </div>
          </form>
        </li>
      </ul>
    </div>
  </div>
  <br>
  <div style="width: 10%; margin: 0 auto; position:relative; top: 60px;">
    <a  (click)="goToMain()" class="btn btn-primary">Go Back!</a>
  </div>
  `,
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
      let link = ['Main'];
      this.router.navigate(link);
    }

}
