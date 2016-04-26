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
const core_1 = require('angular2/core');
const top_nav_component_1 = require('./top-nav.component');
const left_menu_component_1 = require('./left-menu.component');
const top_info_component_1 = require('./top-info.component');
const queries_test_component_1 = require('./queries-test.component');
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: `
        <top-nav></top-nav>
        <left-menu></left-menu>
        <top-info></top-info>
        <queries-test></queries-test>
        <!--<h1 style="margin-bottom: 0;">DOREMUS</h1>
        <p class="dor-sub">DOing REusable MUSical data</p>
        <h2>The new DOREMUS Web App</h2>-->
    `,
        directives: [
            top_nav_component_1.TopNavComponent,
            left_menu_component_1.LeftMenuComponent,
            top_info_component_1.TopInfoComponent,
            queries_test_component_1.QueriesTestComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map