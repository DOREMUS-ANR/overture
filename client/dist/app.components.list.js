"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./components/home/home.component");
var search_results_component_1 = require("./components/search-results/search-results.component");
var error_component_1 = require("./components/commons/error.component");
var loading_component_1 = require("./components/commons/loading.component");
var timeline_component_1 = require("./components/commons/timeline.component");
var performance_tab_component_1 = require("./components/performance-tab/performance-tab.component");
var recording_tab_component_1 = require("./components/recording-tab/recording-tab.component");
var person_tab_component_1 = require("./components/person-tab/person-tab.component");
var score_tab_component_1 = require("./components/score-tab/score-tab.component");
var expression_component_1 = require("./components/expression/expression.component");
var expression_list_component_1 = require("./components/expression/expression.list.component");
var expression_detail_component_1 = require("./components/expression/expression.detail.component");
var summary_component_1 = require("./components/summary/summary.component");
var top_nav_component_1 = require("./components/top-nav/top-nav.component");
var search_component_1 = require("./components/search/search.component");
var wip_component_1 = require("./components/wip/wip.component");
exports.myComponents = {
    HomeComponent: home_component_1.HomeComponent, SearchResultsComponent: search_results_component_1.SearchResultsComponent,
    ErrorComponent: error_component_1.ErrorComponent, LoadingComponent: loading_component_1.LoadingComponent, TimelineComponent: timeline_component_1.TimelineComponent,
    PerformanceTabComponent: performance_tab_component_1.PerformanceTabComponent, RecordingTabComponent: recording_tab_component_1.RecordingTabComponent, PersonTabComponent: person_tab_component_1.PersonTabComponent, ScoreTabComponent: score_tab_component_1.ScoreTabComponent,
    ExpressionComponent: expression_component_1.ExpressionComponent, ExpressionListComponent: expression_list_component_1.ExpressionListComponent, ExpressionDetailComponent: expression_detail_component_1.ExpressionDetailComponent, SummaryComponent: summary_component_1.SummaryComponent,
    WipComponent: wip_component_1.WipComponent, TopNavComponent: top_nav_component_1.TopNavComponent, SearchComponent: search_component_1.SearchComponent
};
exports.myComponentsList = Object.keys(exports.myComponents).map(function (key) { return exports.myComponents[key]; });
