System.register(['@angular/core', '@angular/router', '../../services/workSubDetail.service'], function(exports_1, context_1) {
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
    var core_1, router_1, workSubDetail_service_1;
    var WorkSubDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (workSubDetail_service_1_1) {
                workSubDetail_service_1 = workSubDetail_service_1_1;
            }],
        execute: function() {
            WorkSubDetailComponent = (function () {
                function WorkSubDetailComponent(router, route, service) {
                    this.router = router;
                    this.route = route;
                    this.service = service;
                }
                WorkSubDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.route.params.subscribe(function (params) {
                        var id = +params['id']; // (+) converts string 'id' to a number
                        if (!id)
                            return;
                        _this.service.getSubDetail(id).then(function (subDetail) { return _this.subDetail = subDetail; });
                    });
                };
                WorkSubDetailComponent.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                WorkSubDetailComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'my-work-subdetail',
                        templateUrl: 'workSubDetail.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, workSubDetail_service_1.WorkSubDetailService])
                ], WorkSubDetailComponent);
                return WorkSubDetailComponent;
            }());
            exports_1("WorkSubDetailComponent", WorkSubDetailComponent);
        }
    }
});
