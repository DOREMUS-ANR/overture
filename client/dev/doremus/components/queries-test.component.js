"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('angular2/core');
const queries_test_service_1 = require("../services/queries-test.service");
class resultQ {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
}
exports.resultQ = resultQ;
let QueriesTestComponent = class QueriesTestComponent {
    constructor(_queriesService) {
        this.queriesService = _queriesService;
        this.query = 0;
        var result1 = new resultQ('prueba1', 'tipo1');
        var result2 = new resultQ('prueba2', 'tipo2');
        this.queryResult = [result1, result2];
    }
    loadQuery(id) {
        this.query = id;
        this.queriesService.load('queryTest')
            .subscribe(query => this.queryResult = this.queryBind(query), error => console.error('Error: ' + error), () => console.log('Completed!'));
    }
    queryBind(query) {
        var bindings = query.results.bindings;
        var results = [];
        for (var i in bindings) {
            var binding = bindings[i];
            for (var n in binding) {
                var result = new resultQ(binding[n].value, binding[n].type);
                results.push(result);
            }
        }
        return results;
    }
};
QueriesTestComponent = __decorate([
    core_1.Component({
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
        <li *ngFor="#result of queryResult">
          <span>Value: {{result.value}}</span>
          <span>Type: {{result.type}}</span>
        </li>
      </ul>
    </div>
  </div>
  `,
        providers: [queries_test_service_1.QueriesService]
    }), 
    __metadata('design:paramtypes', [queries_test_service_1.QueriesService])
], QueriesTestComponent);
exports.QueriesTestComponent = QueriesTestComponent;
//# sourceMappingURL=queries-test.component.js.map