System.register(['@angular/router', './components/top-info/top-info.component', './components/search/queries-test.component', './components/work-tab/work-tab.component', './components/performance-tab/performance-tab.component', './components/recording-tab/recording-tab.component', './components/person-tab/person-tab.component', './components/score-tab/score-tab.component', './components/work-tab/workSubDetail.component', './components/expression-tab/expression-tab.component', './components/wip/wip.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, top_info_component_1, queries_test_component_1, work_tab_component_1, performance_tab_component_1, recording_tab_component_1, person_tab_component_1, score_tab_component_1, workSubDetail_component_1, expression_tab_component_1, wip_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
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
