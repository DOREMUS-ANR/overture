"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var app_components_list_1 = require("./app.components.list");
var appRoutes = [
    { path: '', component: app_components_list_1.myComponents.HomeComponent },
    { path: 'search/:input', component: app_components_list_1.myComponents.SearchResultsComponent, data: { title: 'Search' } },
    { path: 'performance', component: app_components_list_1.myComponents.WipComponent, data: { title: 'Performances' } },
    { path: 'recording', component: app_components_list_1.myComponents.RecordingTabComponent, data: { title: 'Recording' } },
    { path: 'person', component: app_components_list_1.myComponents.PersonTabComponent, data: { title: 'Artists' } },
    { path: 'score', component: app_components_list_1.myComponents.ScoreTabComponent, data: { title: 'Scores' } },
    {
        path: 'expression', component: app_components_list_1.myComponents.ExpressionComponent,
        children: [
            { path: ':id', component: app_components_list_1.myComponents.ExpressionDetailComponent },
            { path: '', component: app_components_list_1.myComponents.ExpressionListComponent, data: { title: 'Expressions' } }
        ]
    },
    { path: 'wip', component: app_components_list_1.myComponents.WipComponent },
    { path: '**', component: app_components_list_1.myComponents.HomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
