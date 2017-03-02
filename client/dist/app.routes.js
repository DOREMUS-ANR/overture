"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var app_components_list_1 = require("./app.components.list");
var appRoutes = [
    {
        path: '',
        // name: 'Main',
        component: app_components_list_1.myComponents.HomeComponent
        // useAsDefault: true
    },
    {
        path: 'search',
        // name: 'Search',
        component: app_components_list_1.myComponents.QueriesTestComponent
    },
    {
        path: 'performance',
        component: app_components_list_1.myComponents.WipComponent
    },
    {
        path: 'recording',
        component: app_components_list_1.myComponents.RecordingTabComponent
    },
    {
        path: 'person',
        component: app_components_list_1.myComponents.PersonTabComponent
    },
    {
        path: 'score',
        component: app_components_list_1.myComponents.ScoreTabComponent
    },
    {
        path: 'expression',
        component: app_components_list_1.myComponents.ExpressionComponent,
        children: [
            {
                path: ':id',
                component: app_components_list_1.myComponents.ExpressionDetailComponent
            },
            {
                path: '',
                component: app_components_list_1.myComponents.ExpressionListComponent
            }
        ]
    },
    {
        path: 'wip',
        component: app_components_list_1.myComponents.WipComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
