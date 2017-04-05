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
var http_1 = require("@angular/http");
var app_globals_1 = require("../../app.globals");
require("rxjs/add/operator/toPromise");
var SearchService = (function () {
    function SearchService(http, globals) {
        this.http = http;
        this.globals = globals;
        this.limit = 12;
    }
    SearchService.prototype.query = function (input, offset) {
        if (input === void 0) { input = {}; }
        var search = "lang=" + this.globals.lang;
        if (offset)
            search += '&offset=' + offset;
        return this.http.get("/api/search/" + input, new http_1.RequestOptions({ search: search }))
            .toPromise().then(function (res) {
            var data = res.json();
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                d.id = /[^/]*$/.exec(d.expression)[0];
                d.title = Array.isArray(d.title) ? d.title[0] : d.title;
            }
            return data;
        });
    };
    return SearchService;
}());
SearchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_globals_1.Globals])
], SearchService);
exports.SearchService = SearchService;
