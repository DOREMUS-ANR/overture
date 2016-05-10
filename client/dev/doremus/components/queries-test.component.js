System.register(['@angular/core', '@angular/router', "../services/queries-test.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, queries_test_service_1;
    var resultQ, Vocabulary, QueriesTestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (queries_test_service_1_1) {
                queries_test_service_1 = queries_test_service_1_1;
            }],
        execute: function() {
            resultQ = (function () {
                function resultQ(value, type) {
                    this.value = value;
                    this.type = type;
                }
                return resultQ;
            }());
            exports_1("resultQ", resultQ);
            Vocabulary = (function () {
                function Vocabulary(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return Vocabulary;
            }());
            exports_1("Vocabulary", Vocabulary);
            QueriesTestComponent = (function () {
                function QueriesTestComponent(_queriesService, router) {
                    var _this = this;
                    this.router = router;
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
                QueriesTestComponent.prototype.goToMain = function () {
                    var link = ['Main'];
                    this.router.navigate(link);
                };
                QueriesTestComponent = __decorate([
                    core_1.Component({
                        selector: 'queries-test',
                        template: "\n  <div class='square-box' [style.background]=\"'rgb(155, 186, 114)'\" [style.color]=\"'black'\" style=\"height:auto;\">\n    <div class='square-content' style=\"margin:50px; height:auto;\">\n      <p id='query'>Query: {{query}}</p>\n      <select #sel [style.backgorund]=\"'yellow'\" name=\"singleSelect\" (change)=\"loadQuery(sel.value)\">\n            <option value=\"noSel\">Select ...</option>\n            <option value=\"{{item.name}}\" *ngFor=\"let item of items\">{{item.name}}</option>\n      </select><br>\n      <p>Result</p>\n      <ul [style.background]=\"'white'\">\n        <li *ngFor=\"let result of queryResult\">\n          <form>\n            <div class=\"form-group\">\n              <p>Value:</p>\n              <input type=\"text\" value={{result.value}}>\n            </div>\n            <div class=\"form-group\">\n              <p>Type:</p>\n              <input type=\"text\" value={{result.type}}>\n            </div>\n          </form>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <br>\n  <div style=\"width: 10%; margin: 0 auto; position:relative; top: 60px;\">\n    <a  (click)=\"goToMain()\" class=\"btn btn-primary\">Go Back!</a>\n  </div>\n  ",
                        providers: [queries_test_service_1.QueriesService]
                    }), 
                    __metadata('design:paramtypes', [queries_test_service_1.QueriesService, router_1.Router])
                ], QueriesTestComponent);
                return QueriesTestComponent;
            }());
            exports_1("QueriesTestComponent", QueriesTestComponent);
        }
    }
});

//# sourceMappingURL=queries-test.component.js.map
