System.register(['@angular/core', '@angular/router', '@angular2-material/toolbar/toolbar', './card'], function(exports_1, context_1) {
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
    var core_1, router_1, toolbar_1, card_1;
    var RecommendationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (toolbar_1_1) {
                toolbar_1 = toolbar_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            }],
        execute: function() {
            RecommendationsComponent = (function () {
                function RecommendationsComponent() {
                    this.change = new core_1.EventEmitter();
                }
                RecommendationsComponent.prototype.goToExpression = function (item) {
                    this.change.emit({
                        value: item.id
                    });
                    //console.log("Selected: " + item.id);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], RecommendationsComponent.prototype, "items", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], RecommendationsComponent.prototype, "change", void 0);
                RecommendationsComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'infinite-list',
                        templateUrl: 'recommendations.template.html',
                        directives: [toolbar_1.MdToolbar, card_1.MdCard, card_1.MdCardHeader, router_1.ROUTER_DIRECTIVES],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], RecommendationsComponent);
                return RecommendationsComponent;
            }());
            exports_1("RecommendationsComponent", RecommendationsComponent);
        }
    }
});
