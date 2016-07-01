System.register(['@angular/core', '@angular/router', './top-nav/top-nav.component', './left-menu/left-menu.component', '../services/workSubDetail.service', '../services/queries.service'], function(exports_1, context_1) {
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
    var core_1, router_1, top_nav_component_1, left_menu_component_1, workSubDetail_service_1, queries_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (top_nav_component_1_1) {
                top_nav_component_1 = top_nav_component_1_1;
            },
            function (left_menu_component_1_1) {
                left_menu_component_1 = left_menu_component_1_1;
            },
            function (workSubDetail_service_1_1) {
                workSubDetail_service_1 = workSubDetail_service_1_1;
            },
            function (queries_service_1_1) {
                queries_service_1 = queries_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: '../static/doremus/components/app.template.html',
                        directives: [
                            top_nav_component_1.TopNavComponent,
                            left_menu_component_1.LeftMenuComponent,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [workSubDetail_service_1.WorkSubDetailService, queries_service_1.QueryService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
