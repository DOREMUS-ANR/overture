System.register(["@angular/core", "./expression.service", "../../services/sharedService.service", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, expression_service_1, sharedService_service_1, router_1, frenchDateRegex, ExpressionDetailComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (expression_service_1_1) {
                expression_service_1 = expression_service_1_1;
            },
            function (sharedService_service_1_1) {
                sharedService_service_1 = sharedService_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            frenchDateRegex = /(1er|[\d]{1,2}) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) (\d{4})/;
            ExpressionDetailComponent = (function () {
                function ExpressionDetailComponent(sharedService, expressionService, route) {
                    this.expressionService = expressionService;
                    this.route = route;
                    this.sharedService = sharedService;
                }
                ExpressionDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.forEach(function (params) {
                        var id = params['id'];
                        if (id) {
                            _this.querying = true;
                            _this.expressionService.get(id).then(function (exp) {
                                _this.expression = exp;
                                console.log(_this.expression);
                                _this.querying = false;
                                // prepare dates for timeline
                                _this.dates = [];
                                if (_this.expression.creationTime) {
                                    _this.dates.push({
                                        type: 'creation',
                                        agent: _this.expression.composer,
                                        date: _this.expression.creationTime[0]
                                    });
                                }
                                if (_this.expression.premiere) {
                                    var pNoteParse = frenchDateRegex.exec(_this.expression.premiereNote);
                                    _this.dates.push({
                                        type: 'premiere',
                                        description: _this.expression.premiereNote,
                                        date: pNoteParse && pNoteParse[0]
                                    });
                                }
                                if (_this.expression.publicationEvent) {
                                    var note = _this.expression.publicationEventNote[0];
                                    var yearRegex = /d{4}/;
                                    _this.dates.push({
                                        type: 'publication',
                                        description: note,
                                        date: yearRegex.exec(note.substring(note.length - 4))
                                    });
                                }
                            });
                            // retrieve recommendations
                            _this.expressionService.recommend(id)
                                .then(function (res) { return _this.recommendation = res; });
                            // FIXME discover why this is not propagated to sharedService
                            _this.sharedService.sharchBarVisible = false;
                        }
                    });
                };
                ExpressionDetailComponent.prototype.isNode = function (a) {
                    return a.startsWith('node');
                };
                return ExpressionDetailComponent;
            }());
            ExpressionDetailComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    templateUrl: 'expression.detail.template.html',
                    styleUrls: ['expression.css'],
                    providers: [expression_service_1.ExpressionService]
                }),
                __metadata("design:paramtypes", [sharedService_service_1.SharedService,
                    expression_service_1.ExpressionService,
                    router_1.ActivatedRoute])
            ], ExpressionDetailComponent);
            exports_1("ExpressionDetailComponent", ExpressionDetailComponent);
        }
    };
});
