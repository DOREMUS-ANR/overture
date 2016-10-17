System.register(['@angular/core', "../../services/queries.service", '../../app.globals'], function(exports_1, context_1) {
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
    var core_1, queries_service_1, app_globals_1;
    var Vocabulary, SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (queries_service_1_1) {
                queries_service_1 = queries_service_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            }],
        execute: function() {
            Vocabulary = (function () {
                function Vocabulary(id, text) {
                    this.id = id;
                    this.text = text;
                }
                return Vocabulary;
            }());
            exports_1("Vocabulary", Vocabulary);
            SearchComponent = (function () {
                function SearchComponent(_queriesService, globals) {
                    var _this = this;
                    this._queriesService = _queriesService;
                    this.globals = globals;
                    this.onFilterChanged = new core_1.EventEmitter();
                    this.filter = {
                        key: '',
                        genre: ''
                    };
                    this.disabled = false;
                    this._queriesService.getInformation('vocabulary', 'http://data.doremus.org/vocabulary/key/', globals.lang)
                        .then(function (queryVoc) { return _this.itemsKey = _this.queryBindVoc(queryVoc); }, function (error) { return console.error('Error: ' + error); });
                    this._queriesService.getInformation('vocabulary', 'http://data.doremus.org/vocabulary/genre/', globals.lang)
                        .then(function (queryVoc) { return _this.itemsGenre = _this.queryBindVoc(queryVoc); }, function (error) { return console.error('Error: ' + error); });
                }
                SearchComponent.prototype.queryBindVoc = function (query) {
                    var bindings = query.results.bindings;
                    var results = [];
                    for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
                        var binding = bindings_1[_i];
                        var result = new Vocabulary(binding["uri"].value, binding["label"].value);
                        results.push(result);
                    }
                    return results;
                };
                SearchComponent.prototype.onSelectChanged = function (_a, label) {
                    var id = _a.id;
                    this.filter[label] = id;
                    this.onFilterChanged.emit(this.filter);
                };
                SearchComponent.prototype.changeFilter = function (event) {
                    this.onFilterChanged.emit(this.filter);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SearchComponent.prototype, "onFilterChanged", void 0);
                SearchComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'search-comp',
                        templateUrl: 'search.template.html',
                        styleUrls: ['./search.css'],
                        providers: [queries_service_1.QueryService, app_globals_1.Globals]
                    }), 
                    __metadata('design:paramtypes', [queries_service_1.QueryService, app_globals_1.Globals])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
