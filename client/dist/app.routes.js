System.register(['@angular/router', '@angular/core', './doremus/components/top-info/top-info.component', './doremus/components/search/queries-test.component', './doremus/components/work-tab/work-tab.component', './doremus/components/performance-tab/performance-tab.component', './doremus/components/recording-tab/recording-tab.component', './doremus/components/person-tab/person-tab.component', './doremus/components/score-tab/score-tab.component', './doremus/components/work-tab/workSubDetail.component', './doremus/components/expression-tab/expression-tab.component', './doremus/components/wip/wip.component'], function(exports_1, context_1) {
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
    var router_1, core_1, top_info_component_1, queries_test_component_1, work_tab_component_1, performance_tab_component_1, recording_tab_component_1, person_tab_component_1, score_tab_component_1, workSubDetail_component_1, expression_tab_component_1, wip_component_1;
    var Stub, appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
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
            }],
        execute: function() {
            Stub = (function () {
                function Stub() {
                }
                Stub = __decorate([
                    core_1.Component({
                        selector: '',
                        template: ''
                    }), 
                    __metadata('design:paramtypes', [])
                ], Stub);
                return Stub;
            }());
            appRoutes = [
                {
                    path: '',
                    // name: 'Main',
                    component: top_info_component_1.TopInfoComponent
                },
                {
                    path: 'search',
                    // name: 'Search',
                    component: queries_test_component_1.QueriesTestComponent
                },
                {
                    path: 'work',
                    component: work_tab_component_1.WorkTabComponent,
                    children: [
                        {
                            path: ':id',
                            component: workSubDetail_component_1.WorkSubDetailComponent
                        },
                        {
                            path: '',
                            redirectTo: '1'
                        }
                    ]
                },
                {
                    path: 'performance',
                    component: performance_tab_component_1.PerformanceTabComponent
                },
                {
                    path: 'recording',
                    component: recording_tab_component_1.RecordingTabComponent
                },
                {
                    path: 'person',
                    component: person_tab_component_1.PersonTabComponent
                },
                {
                    path: 'score',
                    component: score_tab_component_1.ScoreTabComponent
                },
                {
                    path: 'expression',
                    component: expression_tab_component_1.ExpressionTabComponent
                },
                {
                    path: 'wip',
                    component: wip_component_1.WipComponent
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
