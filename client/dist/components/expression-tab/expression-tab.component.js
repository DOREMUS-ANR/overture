System.register(['@angular/core', '@angular/router', '../../services/sharedService.service', '../../services/queries.service', '../recommendations/cardInfo', '../../app.globals'], function(exports_1, context_1) {
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
    var core_1, router_1, sharedService_service_1, queries_service_1, cardInfo_1, app_globals_1;
    var Expression, ExpressionTabComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sharedService_service_1_1) {
                sharedService_service_1 = sharedService_service_1_1;
            },
            function (queries_service_1_1) {
                queries_service_1 = queries_service_1_1;
            },
            function (cardInfo_1_1) {
                cardInfo_1 = cardInfo_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            }],
        execute: function() {
            Expression = (function () {
                function Expression(title, key, keyURI, genre, genreURI, opus, note, catalogue, individualWork, complexWork, expCreation, composer, casting, castingNotes) {
                    if (title === void 0) { title = ""; }
                    if (key === void 0) { key = null; }
                    if (keyURI === void 0) { keyURI = null; }
                    if (genre === void 0) { genre = null; }
                    if (genreURI === void 0) { genreURI = null; }
                    if (opus === void 0) { opus = null; }
                    if (note === void 0) { note = null; }
                    if (catalogue === void 0) { catalogue = null; }
                    if (individualWork === void 0) { individualWork = null; }
                    if (complexWork === void 0) { complexWork = null; }
                    if (expCreation === void 0) { expCreation = null; }
                    if (composer === void 0) { composer = null; }
                    if (casting === void 0) { casting = null; }
                    if (castingNotes === void 0) { castingNotes = []; }
                    this.title = title;
                    this.key = key;
                    this.keyURI = keyURI;
                    this.genre = genre;
                    this.genreURI = genreURI;
                    this.opus = opus;
                    this.note = note;
                    this.catalogue = catalogue;
                    this.individualWork = individualWork;
                    this.complexWork = complexWork;
                    this.expCreation = expCreation;
                    this.composer = composer;
                    this.casting = casting;
                    this.castingNotes = castingNotes;
                }
                return Expression;
            }());
            exports_1("Expression", Expression);
            ExpressionTabComponent = (function () {
                function ExpressionTabComponent(_service, sharedService, router, globals) {
                    this._service = _service;
                    this.router = router;
                    this.globals = globals;
                    this.display = 'none';
                    this.class = 'menu-icon icon-plus';
                    this.displayDiscover = 'none';
                    this.classDiscover = 'menu-icon icon-plus';
                    this.search = false;
                    this.expressionURI = "<>";
                    this.sharedService = sharedService;
                    this.globals = globals;
                }
                ExpressionTabComponent.prototype.onSearchClick = function (item) {
                    this.search = item;
                    //console.log("Search: " + this.search)
                };
                ExpressionTabComponent.prototype.onSearchChoosed = function (item) {
                    var _this = this;
                    this.filter = item;
                    this._service.getInformations('selfContainedExpressions', this.filter)
                        .then(function (query) { return _this.items = _this.queryBind(query); }, function (error) { return console.error('Error: ' + error); });
                    this.expression = null;
                };
                ExpressionTabComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._service.getInformations('selfContainedExpressions', this.filter)
                        .then(function (query) { return _this.items = _this.queryBind(query); }, function (error) { return console.error('Error: ' + error); });
                    this._service.getInformation('selfContainedExpressionDet', this.expressionURI, null)
                        .then(function (res) { return _this.expression = _this.queryBindExp(res); }, function (error) { return console.error('Error: ' + error); });
                };
                ExpressionTabComponent.prototype.queryBind = function (query) {
                    var bindings = query.results.bindings;
                    var results = [];
                    for (var i in bindings) {
                        var binding = bindings[i];
                        var result = new cardInfo_1.RecommendationCardInfo(binding["expressions"].value, binding["title"].value, (binding["composer"] != null) ? binding["composer"].value : null);
                        results.push(result);
                    }
                    return results;
                };
                ExpressionTabComponent.prototype.queryBindExp = function (query) {
                    var bindings = query.results.bindings;
                    var results;
                    var binding = bindings[0];
                    var expression = null;
                    var result = new Expression;
                    var lang = this.globals.lang || 'en';
                    for (var i in bindings) {
                        result.title = (bindings[i]["title"] != null) ?
                            ((result.title == "") ? result.title.concat(bindings[i]["title"].value) : result.title.concat("- ", bindings[i]["title"].value))
                            : result.title;
                        if (bindings[i]["castingNote"] != null) {
                            result.castingNotes.push(bindings[i]["castingNote"].value);
                        }
                    }
                    if (binding != undefined) {
                        result.keyURI = (binding["key"] != null) ? binding["key"].value : null;
                        if (result.keyURI) {
                            this._service.getInformation('vocabularyURI', "<" + result.keyURI + ">", lang)
                                .then(function (query) { return result.key = query.results.bindings[0]["name"].value; }, function (error) { return console.error('Error: ' + error); });
                        }
                        else {
                            result.key = (binding["keyID"] != null) ? binding["keyID"].value : null;
                        }
                        result.genreURI = (binding["genre"] != null) ? binding["genre"].value : null;
                        if (result.genreURI != null) {
                            this._service.getInformation('vocabularyURI', "<" + result.genreURI + ">", lang)
                                .then(function (query) { return result.genre = query.results.bindings[0]["name"].value; }, function (error) { return console.error('Error: ' + error); });
                        }
                        else {
                            result.genre = (binding["genreID"] != null) ? binding["genreID"].value : null;
                        }
                        result.opus = (binding["opusNote"] != null) ? binding["opusNote"].value : null;
                        result.note = (binding["note"] != null) ? binding["note"].value : null;
                        result.catalogue = (binding["catagNote"] != null) ? binding["catagNote"].value : null;
                        result.individualWork = (binding["individualWork"] != null) ? binding["individualWork"].value : null;
                        result.complexWork = (binding["complexWork"] != null) ? binding["complexWork"].value : null;
                        result.expCreation = (binding["expCreation"] != null) ? binding["expCreation"].value : null;
                        result.composer = (binding["composer"] != null) ? binding["composer"].value : null;
                        result.casting = (binding["casting"] != null) ? binding["casting"].value : null;
                        expression = result;
                    }
                    return expression;
                };
                ExpressionTabComponent.prototype.openInstruments = function () {
                    this.display = this.display.match('none') ? 'inline' : 'none';
                    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
                };
                ExpressionTabComponent.prototype.openDiscover = function () {
                    this.displayDiscover = this.displayDiscover.match('none') ? 'inline' : 'none';
                    this.classDiscover = this.displayDiscover.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
                };
                ExpressionTabComponent.prototype.onScroll = function () {
                    var _this = this;
                    this._service.getMoreInformation('selfContainedExpressions', this.filter)
                        .then(function (query) { return _this.items = _this.queryBind(query); }, function (error) { return console.error('Error: ' + error); });
                };
                ExpressionTabComponent.prototype.myIdChange = function (event) {
                    this.expressionURI = '<' + event.value + '>';
                    this.ngOnInit();
                    window.scrollTo(0, 0);
                };
                ExpressionTabComponent.prototype.wip = function () {
                    this.router.navigate(['/wip']);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ExpressionTabComponent.prototype, "expressionURI", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Array)
                ], ExpressionTabComponent.prototype, "items", void 0);
                ExpressionTabComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'expression-tab',
                        templateUrl: 'expression-tab.template.html',
                        styleUrls: ['expression.css'],
                        providers: [queries_service_1.QueryService]
                    }), 
                    __metadata('design:paramtypes', [queries_service_1.QueryService, sharedService_service_1.SharedService, router_1.Router, app_globals_1.Globals])
                ], ExpressionTabComponent);
                return ExpressionTabComponent;
            }());
            exports_1("ExpressionTabComponent", ExpressionTabComponent);
        }
    }
});
