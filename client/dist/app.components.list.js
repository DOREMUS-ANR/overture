System.register(['./components/top-info/top-info.component', './components/search/queries-test.component', './components/work-tab/work-tab.component', './components/performance-tab/performance-tab.component', './components/recording-tab/recording-tab.component', './components/person-tab/person-tab.component', './components/score-tab/score-tab.component', './components/work-tab/workSubDetail.component', './components/expression/expression.list.component', './components/expression/expression.detail.component', './components/top-nav/top-nav.component', './components/search/search.component', './components/wip/wip.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var top_info_component_1, queries_test_component_1, work_tab_component_1, performance_tab_component_1, recording_tab_component_1, person_tab_component_1, score_tab_component_1, workSubDetail_component_1, expression_list_component_1, expression_detail_component_1, top_nav_component_1, search_component_1, wip_component_1;
    var myComponents, myComponentsList;
    return {
        setters:[
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
            function (expression_list_component_1_1) {
                expression_list_component_1 = expression_list_component_1_1;
            },
            function (expression_detail_component_1_1) {
                expression_detail_component_1 = expression_detail_component_1_1;
            },
            function (top_nav_component_1_1) {
                top_nav_component_1 = top_nav_component_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (wip_component_1_1) {
                wip_component_1 = wip_component_1_1;
            }],
        execute: function() {
            exports_1("myComponents", myComponents = {
                TopInfoComponent: top_info_component_1.TopInfoComponent, QueriesTestComponent: queries_test_component_1.QueriesTestComponent, WorkTabComponent: work_tab_component_1.WorkTabComponent, PerformanceTabComponent: performance_tab_component_1.PerformanceTabComponent, RecordingTabComponent: recording_tab_component_1.RecordingTabComponent, PersonTabComponent: person_tab_component_1.PersonTabComponent, ScoreTabComponent: score_tab_component_1.ScoreTabComponent, WorkSubDetailComponent: workSubDetail_component_1.WorkSubDetailComponent, ExpressionListComponent: expression_list_component_1.ExpressionListComponent, ExpressionDetailComponent: expression_detail_component_1.ExpressionDetailComponent, WipComponent: wip_component_1.WipComponent, TopNavComponent: top_nav_component_1.TopNavComponent, SearchComponent: search_component_1.SearchComponent
            });
            exports_1("myComponentsList", myComponentsList = Object.keys(myComponents).map(function (key) { return myComponents[key]; }));
        }
    }
});
