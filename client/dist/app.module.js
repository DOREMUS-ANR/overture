System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', '@angular/material', 'angular2-infinite-scroll', './components/app.component', './components/top-info/top-info.component', './components/search/queries-test.component', './components/work-tab/work-tab.component', './components/performance-tab/performance-tab.component', './components/recording-tab/recording-tab.component', './components/person-tab/person-tab.component', './components/score-tab/score-tab.component', './components/work-tab/workSubDetail.component', './components/expression-tab/expression-tab.component', './components/top-nav/top-nav.component', './components/recommendations/recommendations.component', './components/search/search.component', './components/wip/wip.component', './services/sharedService.service', './app.routes', './app.globals'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, http_1, material_1, angular2_infinite_scroll_1, app_component_1, top_info_component_1, queries_test_component_1, work_tab_component_1, performance_tab_component_1, recording_tab_component_1, person_tab_component_1, score_tab_component_1, workSubDetail_component_1, expression_tab_component_1, top_nav_component_1, recommendations_component_1, search_component_1, wip_component_1, sharedService_service_1, app_routes_1, app_globals_1;
    var myComponents, AppModule;
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
            function (material_1_1) {
                material_1 = material_1_1;
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
            function (top_nav_component_1_1) {
                top_nav_component_1 = top_nav_component_1_1;
            },
            function (recommendations_component_1_1) {
                recommendations_component_1 = recommendations_component_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (wip_component_1_1) {
                wip_component_1 = wip_component_1_1;
            },
            function (sharedService_service_1_1) {
                sharedService_service_1 = sharedService_service_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            }],
        execute: function() {
            myComponents = [
                app_component_1.AppComponent, top_info_component_1.TopInfoComponent, queries_test_component_1.QueriesTestComponent, work_tab_component_1.WorkTabComponent, performance_tab_component_1.PerformanceTabComponent, recording_tab_component_1.RecordingTabComponent, person_tab_component_1.PersonTabComponent, score_tab_component_1.ScoreTabComponent, workSubDetail_component_1.WorkSubDetailComponent, expression_tab_component_1.ExpressionTabComponent, wip_component_1.WipComponent, top_nav_component_1.TopNavComponent, search_component_1.SearchComponent, recommendations_component_1.RecommendationsComponent
            ];
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routes_1.routing, material_1.MaterialModule.forRoot(), angular2_infinite_scroll_1.InfiniteScrollModule],
                        declarations: myComponents.slice(),
                        bootstrap: [app_component_1.AppComponent],
                        providers: [sharedService_service_1.SharedService, app_globals_1.Globals]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
