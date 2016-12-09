System.register(['@angular/core', './vocabulary.service', '../../app.globals', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, vocabulary_service_1, app_globals_1, router_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (vocabulary_service_1_1) {
                vocabulary_service_1 = vocabulary_service_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(_vocabularyService, globals, route) {
                    var _this = this;
                    this._vocabularyService = _vocabularyService;
                    this.globals = globals;
                    this.route = route;
                    this.onFilterChanged = new core_1.EventEmitter();
                    this.filter = {
                        key: '',
                        genre: ''
                    };
                    this._vocabularyService.get('key')
                        .then(function (voc) {
                        _this.itemsKey = voc.map(function (item) { return ({
                            id: item.uri.value,
                            text: (item.label || item.labelEn || item.labelAny).value
                        }); });
                    }, function (error) { return console.error('Error: ' + error); });
                    this._vocabularyService.get('iaml/genre')
                        .then(function (voc) {
                        _this.itemsGenre = voc.map(function (item) { return ({
                            id: item.uri.value,
                            text: (item.label || item.labelEn || item.labelAny).value
                        }); });
                    }, function (error) { return console.error('Error: ' + error); });
                }
                SearchComponent.prototype.ngOnInit = function () {
                    Object.assign(this.filter, this.route.queryParams['value']);
                };
                SearchComponent.prototype.onSelectChanged = function (_a, label) {
                    var id = _a.id;
                    this.filter[label] = id || '';
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
                        providers: [vocabulary_service_1.VocabularyService, app_globals_1.Globals]
                    }), 
                    __metadata('design:paramtypes', [vocabulary_service_1.VocabularyService, app_globals_1.Globals, router_1.ActivatedRoute])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
