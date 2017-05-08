"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("hammerjs");
var material_1 = require("@angular/material");
var angular2_moment_1 = require("angular2-moment");
var ng_select_1 = require("ng-select");
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var app_component_1 = require("./components/app.component");
var app_components_list_1 = require("./app.components.list");
var sharedService_service_1 = require("./services/sharedService.service");
var app_routes_1 = require("./app.routes");
var app_globals_1 = require("./app.globals");
var keys_pipe_1 = require("./pipes/keys.pipe");
var summary_pipe_1 = require("./pipes/summary.pipe");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, forms_1.FormsModule, http_1.HttpModule, app_routes_1.routing, material_1.MaterialModule, material_1.MdSelectModule, angular2_moment_1.MomentModule, ngx_infinite_scroll_1.InfiniteScrollModule, ng_select_1.SelectModule],
        declarations: app_components_list_1.myComponentsList.concat([app_component_1.AppComponent, keys_pipe_1.KeysPipe, summary_pipe_1.SummaryPipe]),
        bootstrap: [app_component_1.AppComponent],
        providers: [sharedService_service_1.SharedService, app_globals_1.Globals, keys_pipe_1.KeysPipe, summary_pipe_1.SummaryPipe, platform_browser_1.Title]
    })
], AppModule);
exports.AppModule = AppModule;
