"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var top_nav_component_1 = require('./top-nav.component');
var left_menu_component_1 = require('./left-menu.component');
var top_info_component_1 = require('./top-info.component');
var queries_test_component_1 = require('./queries-test.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <top-nav></top-nav>\n        <left-menu></left-menu>\n        <top-info></top-info>\n        <queries-test></queries-test>\n    ",
            directives: [
                top_nav_component_1.TopNavComponent,
                left_menu_component_1.LeftMenuComponent,
                top_info_component_1.TopInfoComponent,
                queries_test_component_1.QueriesTestComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
