System.register(["@angular/core", "@angular/router", "../../services/sharedService.service", "../../app.globals", "./expression.service"], function (exports_1, context_1) {
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
    var core_1, router_1, sharedService_service_1, app_globals_1, expression_service_1, Expression, ExpressionListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sharedService_service_1_1) {
                sharedService_service_1 = sharedService_service_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            },
            function (expression_service_1_1) {
                expression_service_1 = expression_service_1_1;
            }
        ],
        execute: function () {
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
            ExpressionListComponent = (function () {
                function ExpressionListComponent(_expressionService, sharedService, router, globals, route) {
                    this._expressionService = _expressionService;
                    this.router = router;
                    this.globals = globals;
                    this.route = route;
                    this.display = 'none';
                    this.class = 'menu-icon icon-plus';
                    this.displayDiscover = 'none';
                    this.classDiscover = 'menu-icon icon-plus';
                    this.search = false;
                    this.filter = {};
                    this.querying = false;
                    this.error = false;
                    this.scrollInProgress = false;
                    this.sharedService = sharedService;
                    this.globals = globals;
                }
                ExpressionListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.filter = this.route.queryParams['value'];
                    if (Object.keys(this.filter).length)
                        this.sharedService.show();
                    this.getList();
                    this.router.events
                        .map(function (event) { return event instanceof router_1.NavigationStart; })
                        .subscribe(function () {
                        var newFilter = _this.route.queryParams['value'];
                        if (JSON.stringify(newFilter) != JSON.stringify(_this.filter)) {
                            _this.filter = newFilter;
                            _this.getList();
                        }
                    }, function (err) { return console.error(err); });
                };
                ExpressionListComponent.prototype.getList = function () {
                    var _this = this;
                    if (this.querying)
                        return false;
                    this.querying = true;
                    this._expressionService.query(this.filter).then(function (res) {
                        _this.items = res;
                        _this.querying = false;
                    }, function (error) {
                        console.error('Error: ' + error);
                        _this.querying = false;
                        _this.error = true;
                    });
                };
                ExpressionListComponent.prototype.onFilterChanged = function (filter) {
                    if (filter === void 0) { filter = {}; }
                    this.router.navigate(['/expression'], {
                        queryParams: filter
                    });
                };
                ExpressionListComponent.prototype.openInstruments = function () {
                    this.display = this.display.match('none') ? 'inline' : 'none';
                    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
                };
                ExpressionListComponent.prototype.openDiscover = function () {
                    this.displayDiscover = this.displayDiscover.match('none') ? 'inline' : 'none';
                    this.classDiscover = this.displayDiscover.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
                };
                ExpressionListComponent.prototype.onScroll = function () {
                    var _this = this;
                    if (this.scrollInProgress)
                        return;
                    this.scrollInProgress = true;
                    this._expressionService.query(this.filter, this.items.length)
                        .then(function (res) {
                        _this.scrollInProgress = false;
                        (_a = _this.items).push.apply(_a, res);
                        var _a;
                    }, function (error) { return console.error('Error: ' + error); });
                };
                ExpressionListComponent.prototype.myIdChange = function (event) {
                    this.expressionURI = '<' + event.value + '>';
                    this.ngOnInit();
                    window.scrollTo(0, 0);
                };
                ExpressionListComponent.prototype.wip = function () {
                    this.router.navigate(['/wip']);
                };
                return ExpressionListComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ExpressionListComponent.prototype, "expressionURI", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", Array)
            ], ExpressionListComponent.prototype, "items", void 0);
            ExpressionListComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    templateUrl: 'expression.list.template.html',
                    styleUrls: ['expression.css'],
                    providers: [expression_service_1.ExpressionService]
                }),
                __metadata("design:paramtypes", [expression_service_1.ExpressionService, sharedService_service_1.SharedService,
                    router_1.Router, app_globals_1.Globals, router_1.ActivatedRoute])
            ], ExpressionListComponent);
            exports_1("ExpressionListComponent", ExpressionListComponent);
        }
    };
});
