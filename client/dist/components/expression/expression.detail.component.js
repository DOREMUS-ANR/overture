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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var expression_service_1 = require("./expression.service");
var sharedService_service_1 = require("../../services/sharedService.service");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var organizBase = 'http://data.doremus.org/organization/';
var institutions = {
    Philharmonie_de_Paris: {
        label: 'Philharmonie de Paris',
        img: '/static/img/logos/philharmonie.png'
    },
    BnF: {
        label: 'BnF',
        img: '/static/img/logos/bnf.png'
    }
};
var ExpressionDetailComponent = (function () {
    function ExpressionDetailComponent(titleService, sharedService, expressionService, route) {
        this.titleService = titleService;
        this.expressionService = expressionService;
        this.route = route;
        this.error = false;
        this.sharedService = sharedService;
    }
    ExpressionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id) {
                _this.querying = true;
                _this.expressionService.get(id).subscribe(function (exp) {
                    _this.expression = exp;
                    _this.titleService.setTitle(exp.title[0]);
                    console.log(_this.expression);
                    _this.querying = false;
                    _this.error = false;
                    // prepare dates for timeline
                    _this.dates = [];
                    if (_this.expression.creationStart)
                        _this.dates.push({
                            type: 'creation',
                            agent: _this.expression.composer,
                            date: _this.expression.creationStart
                        });
                    if (_this.expression.premiere)
                        _this.dates.push({
                            type: 'premiere',
                            description: _this.expression.premiereNote,
                            date: _this.expression.premiereStart
                        });
                    if (_this.expression.publicationEvent)
                        _this.dates.push({
                            type: 'publication',
                            description: _this.expression.publicationEventNote,
                            date: _this.expression.publicationStart
                        });
                }, function (err) {
                    _this.querying = false;
                    _this.error = true;
                    console.error(err);
                });
                // retrieve recommendations
                _this.expressionService.recommend(id)
                    .then(function (res) { return _this.recommendation = res; }, function (err) {
                    _this.error = true;
                    console.error(err);
                });
                // FIXME discover why this is not propagated to sharedService
                _this.sharedService.sharchBarVisible = false;
            }
        });
    };
    ExpressionDetailComponent.prototype.isNode = function (a) {
        return a.startsWith('node');
    };
    ExpressionDetailComponent.prototype.getSource = function (source) {
        if (Array.isArray(source))
            source = source[0];
        if (!source.startsWith(organizBase))
            return null;
        var inst = source.replace(organizBase, '');
        return institutions[inst];
    };
    ExpressionDetailComponent.prototype.class2Label = function (cls) {
        switch (cls) {
            case 'http://erlangen-crm.org/efrbroo/F31_Performance':
            case 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation':
                return 'Performance';
            case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
                return 'Publication';
            default: return cls;
        }
    };
    return ExpressionDetailComponent;
}());
ExpressionDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './expression.detail.template.html',
        styleUrls: ['./expression.css'],
        providers: [expression_service_1.ExpressionService]
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title,
        sharedService_service_1.SharedService,
        expression_service_1.ExpressionService,
        router_1.ActivatedRoute])
], ExpressionDetailComponent);
exports.ExpressionDetailComponent = ExpressionDetailComponent;
