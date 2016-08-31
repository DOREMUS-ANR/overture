System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', '@angular2-material/button', 'angular2-infinite-scroll/angular2-infinite-scroll', './doremus/components/app.component', './doremus/components/top-info/top-info.component', './doremus/components/search/queries-test.component', './doremus/components/work-tab/work-tab.component', './doremus/components/performance-tab/performance-tab.component', './doremus/components/recording-tab/recording-tab.component', './doremus/components/person-tab/person-tab.component', './doremus/components/score-tab/score-tab.component', './doremus/components/work-tab/workSubDetail.component', './doremus/components/expression-tab/expression-tab.component', './doremus/components/wip/wip.component', './doremus/services/sharedService.service', './app.routes'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, http_1, button_1, angular2_infinite_scroll_1, app_component_1, top_info_component_1, queries_test_component_1, work_tab_component_1, performance_tab_component_1, recording_tab_component_1, person_tab_component_1, score_tab_component_1, workSubDetail_component_1, expression_tab_component_1, wip_component_1, sharedService_service_1, app_routes_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (angular2_infinite_scroll_1_1) {
                angular2_infinite_scroll_1 = angular2_infinite_scroll_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (top_info_component_1_1) {
                top_info_component_1 = top_info_component_1_1;
            },
            function (queries_test_component_1_1) {
                queries_test_component_1 = queries_test_component_1_1;
            },
            function (work_tab_component_1_1) {
                work_tab_component_1 = work_tab_component_1_1;
            },
            function (performance_tab_component_1_1) {
                performance_tab_component_1 = performance_tab_component_1_1;
            },
            function (recording_tab_component_1_1) {
                recording_tab_component_1 = recording_tab_component_1_1;
            },
            function (person_tab_component_1_1) {
                person_tab_component_1 = person_tab_component_1_1;
            },
            function (score_tab_component_1_1) {
                score_tab_component_1 = score_tab_component_1_1;
            },
            function (workSubDetail_component_1_1) {
                workSubDetail_component_1 = workSubDetail_component_1_1;
            },
            function (expression_tab_component_1_1) {
                expression_tab_component_1 = expression_tab_component_1_1;
            },
            function (wip_component_1_1) {
                wip_component_1 = wip_component_1_1;
            },
            function (sharedService_service_1_1) {
                sharedService_service_1 = sharedService_service_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routes_1.routing, button_1.MdButtonModule, angular2_infinite_scroll_1.InfiniteScrollModule],
                        declarations: [app_component_1.AppComponent, top_info_component_1.TopInfoComponent, queries_test_component_1.QueriesTestComponent, work_tab_component_1.WorkTabComponent, performance_tab_component_1.PerformanceTabComponent, recording_tab_component_1.RecordingTabComponent, person_tab_component_1.PersonTabComponent, score_tab_component_1.ScoreTabComponent, workSubDetail_component_1.WorkSubDetailComponent, expression_tab_component_1.ExpressionTabComponent, wip_component_1.WipComponent],
                        bootstrap: [app_component_1.AppComponent],
                        providers: [sharedService_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
