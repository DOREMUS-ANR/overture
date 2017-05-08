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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var headerOpacityThreshold = 300;
var AppComponent = (function () {
    function AppComponent(router, activatedRoute, titleService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.showSearch = false;
        this.headerOpacity = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // set title based on the title of the route in app.routes.ts
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (event) {
            var title = event.title || 'Overture';
            return _this.titleService.setTitle(title);
        });
    };
    AppComponent.prototype.updateHeaderOpacity = function (evt) {
        var currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        var headerOpacity = isNaN(currPos) ? 0 : currPos / headerOpacityThreshold;
        this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: './app.template.html',
        host: {
            '(window:scroll)': 'updateHeaderOpacity($event)'
        }
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        platform_browser_1.Title])
], AppComponent);
exports.AppComponent = AppComponent;
