System.register(['@angular/core', 'ng2-select/ng2-select', "../../services/queries.service", "../../services/sharedService.service"], function(exports_1, context_1) {
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
    var core_1, ng2_select_1, queries_service_1, sharedService_service_1;
    var Vocabulary, SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_select_1_1) {
                ng2_select_1 = ng2_select_1_1;
            },
            function (queries_service_1_1) {
                queries_service_1 = queries_service_1_1;
            },
            function (sharedService_service_1_1) {
                sharedService_service_1 = sharedService_service_1_1;
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
                function SearchComponent(_queriesService, _sharedService) {
                    var _this = this;
                    this._queriesService = _queriesService;
                    this._sharedService = _sharedService;
                    this.disabled = false;
                    this._queriesService.getInformation('vocabulary', "<http://data.doremus.org/vocabulary/key>", 'fr')
                        .subscribe(function (queryVoc) { return _this.itemsKey = _this.queryBindVoc(queryVoc); }, function (error) { return console.error('Error: ' + error); });
                    this._queriesService.getInformation('vocabulary', "<http://data.doremus.org/vocabulary/genre>", 'fr')
                        .subscribe(function (queryVoc) { return _this.itemsGenre = _this.queryBindVoc(queryVoc); }, function (error) { return console.error('Error: ' + error); });
                }
                SearchComponent.prototype.queryBindVoc = function (query) {
                    var bindings = query.results.bindings;
                    var results = [];
                    for (var i in bindings) {
                        var binding = bindings[i];
                        var result = new Vocabulary(binding["uri"].value, binding["label"].value);
                        results.push(result);
                    }
                    return results;
                };
                SearchComponent.prototype.loadQuery = function (selKey, selGenre) {
                    var options = this._sharedService.getFilterOptions();
                    options[0] = (selKey == undefined) ? 'noSel' : selKey.activeOption.id;
                    options[1] = (selGenre == undefined) ? 'noSel' : selGenre.activeOption.id;
                    this._sharedService.setFilterOptions(options);
                    this._sharedService.filter();
                };
                SearchComponent.prototype.removeItem = function (item) {
                    var options = this._sharedService.getFilterOptions();
                    options[0] = (item == 'key') ? 'noSel' : options[0];
                    options[1] = (item == 'genre') ? 'noSel' : options[1];
                    this._sharedService.setFilterOptions(options);
                    this._sharedService.filter();
                };
                SearchComponent.prototype.onTitle = function (event) {
                    var options = this._sharedService.getFilterOptions();
                    options[2] = event.target.value;
                    this._sharedService.setFilterOptions(options);
                    this._sharedService.filter();
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'search-comp',
                        templateUrl: 'search.template.html',
                        providers: [queries_service_1.QueryService],
                        directives: [ng2_select_1.SELECT_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [queries_service_1.QueryService, sharedService_service_1.SharedService])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
