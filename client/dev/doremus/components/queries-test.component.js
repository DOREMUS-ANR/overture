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
var core_1 = require('angular2/core');
var queries_test_service_1 = require("../services/queries-test.service");
var resultQ = (function () {
    function resultQ(value, type) {
        this.value = value;
        this.type = type;
    }
    return resultQ;
}());
exports.resultQ = resultQ;
var Vocabulary = (function () {
    function Vocabulary(id, name) {
        this.id = id;
        this.name = name;
    }
    return Vocabulary;
}());
exports.Vocabulary = Vocabulary;
var QueriesTestComponent = (function () {
    function QueriesTestComponent(_queriesService) {
        var _this = this;
        this.queriesService = _queriesService;
        this.query = 0;
        var result1 = new resultQ('prueba1', 'tipo1');
        var result2 = new resultQ('prueba2', 'tipo2');
        this.queryResult = [result1, result2];
        this.queriesService.load('queryVoc', '', '')
            .subscribe(function (queryVoc) { return _this.items = _this.queryBindVoc(queryVoc); }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Completed!'); });
    }
    QueriesTestComponent.prototype.loadQuery = function (id) {
        var _this = this;
        this.query = id;
        //alert(this.query);
        this.queriesService.load('queryTest', '<http://data.doremus.org/ontology/U11_has_key>', this.query)
            .subscribe(function (query) { return _this.queryResult = _this.queryBind(query); }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Completed!'); });
    };
    QueriesTestComponent.prototype.queryBind = function (query) {
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
    };
    QueriesTestComponent.prototype.queryBindVoc = function (query) {
        var bindings = query.results.bindings;
        var results = [];
        for (var i in bindings) {
            var binding = bindings[i];
            var result = new Vocabulary(binding["concept"].value, binding["label"].value);
            results.push(result);
        }
        return results;
    };
    QueriesTestComponent = __decorate([
        core_1.Component({
            selector: 'queries-test',
            template: "\n  <br>\n  <br>\n  <div class='square-box' [style.background]=\"'rgb(155, 186, 114)'\" [style.color]=\"'black'\">\n    <div class='square-content' style=\"margin:100px;\">\n      <p id='query'>Query: {{query}}</p>\n      <select #sel [style.backgorund]=\"'yellow'\" name=\"singleSelect\" (change)=\"loadQuery(sel.value)\">\n            <option value=\"noSel\">Select ...</option>\n            <option value=\"{{item.name}}\" *ngFor=\"#item of items\">{{item.name}}</option>\n      </select><br>\n    <p>Result</p>\n      <ul [style.background]=\"'white'\">\n        <li *ngFor=\"#result of queryResult\">\n          <span>Value: {{result.value}}</span>\n          <span>Type: {{result.type}}</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n  ",
            providers: [queries_test_service_1.QueriesService]
        }), 
        __metadata('design:paramtypes', [queries_test_service_1.QueriesService])
    ], QueriesTestComponent);
    return QueriesTestComponent;
}());
exports.QueriesTestComponent = QueriesTestComponent;

//# sourceMappingURL=queries-test.component.js.map
