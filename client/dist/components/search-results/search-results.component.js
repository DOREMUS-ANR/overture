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
var app_globals_1 = require("../../app.globals");
var search_service_1 = require("./search.service");
var SearchResultsComponent = (function () {
    function SearchResultsComponent(_searchService, router, globals, route) {
        var _this = this;
        this._searchService = _searchService;
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.querying = true;
        this.error = false;
        this.globals = globals;
        router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd && val.url.startsWith('/search')) {
                _this.querying = true;
                _this.error = false;
            }
            if (val instanceof router_1.NavigationEnd && val.url.startsWith('/search'))
                _this.search();
        });
    }
    SearchResultsComponent.prototype.search = function () {
        var _this = this;
        this.input = this.route.snapshot.params['input'];
        this.querying = true;
        this.error = false;
        this._searchService.query(this.input).then(function (res) {
            _this.items = res;
            console.log(res);
            _this.querying = false;
        }, function (error) {
            console.error('Error: ' + error);
            _this.querying = false;
            _this.error = true;
        });
    };
    return SearchResultsComponent;
}());
SearchResultsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './search-results.template.html',
        // styleUrls: ['./expression.css'],
        providers: [search_service_1.SearchService]
    }),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        router_1.Router, app_globals_1.Globals, router_1.ActivatedRoute])
], SearchResultsComponent);
exports.SearchResultsComponent = SearchResultsComponent;
