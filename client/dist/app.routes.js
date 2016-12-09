System.register(['@angular/router', './app.components.list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_components_list_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_components_list_1_1) {
                app_components_list_1 = app_components_list_1_1;
            }],
        execute: function() {
            appRoutes = [
                {
                    path: '',
                    // name: 'Main',
                    component: app_components_list_1.myComponents.HomeComponent
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
                    component: app_components_list_1.myComponents.ExpressionListComponent,
                    children: [
                        {
                            path: ':id',
                            component: app_components_list_1.myComponents.ExpressionDetailComponent
                        },
                        {
                            path: '',
                            //TODO change
                            component: app_components_list_1.myComponents.ExpressionDetailComponent
                        }
                    ]
                },
                {
                    path: 'wip',
                    component: app_components_list_1.myComponents.WipComponent
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
