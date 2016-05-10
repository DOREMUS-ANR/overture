System.register(['@angular/core', '@angular/router', './top-nav/top-nav.component', './left-menu.component', './top-info.component', './queries-test.component'], function(exports_1, context_1) {
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
    var core_1, router_1, top_nav_component_1, left_menu_component_1, top_info_component_1, queries_test_component_1;
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
            function (top_info_component_1_1) {
                top_info_component_1 = top_info_component_1_1;
            },
            function (queries_test_component_1_1) {
                queries_test_component_1 = queries_test_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <top-nav></top-nav>\n        <left-menu></left-menu>\n\n        <router-outlet>see me</router-outlet>\n    ",
                        directives: [
                            top_nav_component_1.TopNavComponent,
                            left_menu_component_1.LeftMenuComponent,
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }),
                    router_1.Routes([
                        {
                            path: '/',
                            // name: 'Main',
                            component: top_info_component_1.TopInfoComponent,
                        },
                        {
                            path: '/search',
                            // name: 'Search',
                            component: queries_test_component_1.QueriesTestComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
