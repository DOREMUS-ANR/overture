System.register(["@angular/core", "../../services/queries.service", "../../app.globals"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, queries_service_1, app_globals_1, resultQ, Vocabulary, QueriesTestComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (queries_service_1_1) {
                queries_service_1 = queries_service_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            }
        ],
        execute: function () {
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
                function QueriesTestComponent(_queriesService, globals) {
                    var _this = this;
                    this._queriesService = _queriesService;
                    this.globals = globals;
                    this.query = 0;
                    var result1 = new resultQ('prueba1', 'tipo1');
                    var result2 = new resultQ('prueba2', 'tipo2');
                    this.queryResult = [result1, result2];
                    this._queriesService.getInformation('vocabulary', 'http://data.doremus.org/vocabulary/key/', globals.lang)
                        .then(function (queryVoc) { return _this.items = _this.queryBindVoc(queryVoc); }, function (error) { return console.error('Error: ' + error); });
                }
                QueriesTestComponent.prototype.loadQuery = function (sel) {
                    var _this = this;
                    this._queriesService.getInformation('searchQuery', sel, null)
                        .then(function (query) { return _this.queryResult = _this.queryBind(query); }, function (error) { return console.error('Error: ' + error); });
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
                        var result = new Vocabulary(binding["uri"].value, binding["label"].value);
                        results.push(result);
                    }
                    return results;
                };
                return QueriesTestComponent;
            }());
            QueriesTestComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    selector: 'queries-test',
                    templateUrl: 'queries-test.template.html',
                    providers: [queries_service_1.QueryService, app_globals_1.Globals]
                }),
                __metadata("design:paramtypes", [queries_service_1.QueryService, app_globals_1.Globals])
            ], QueriesTestComponent);
            exports_1("QueriesTestComponent", QueriesTestComponent);
        }
    };
});
