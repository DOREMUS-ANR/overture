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
require("rxjs/add/operator/toPromise");
var QueryService = (function () {
    function QueryService(http) {
        this.http = http;
        this.end = 20;
    }
    QueryService.prototype.getInformations = function (id, items) {
        this.end = 10;
        var filterOptions = "";
        if (items && items[0]) {
            filterOptions = '&key=' + items[0];
        }
        if (items && items[1]) {
            filterOptions += '&genre=' + items[1];
        }
        if (items && items[2]) {
            filterOptions += '&title=' + items[2];
        }
        var options = new http_1.RequestOptions({
            search: 'id=' + id + '&lim=' + this.end + filterOptions
        });
        return this.http.get("../api/query", options).toPromise().then(function (res) { return res.json(); });
    };
    QueryService.prototype.getMoreInformation = function (id, items) {
        this.end += 10;
        var filterOptions = "";
        if (items && items[0]) {
            filterOptions = '&key=' + items[0];
        }
        if (items && items[1]) {
            filterOptions += '&genre=' + items[1];
        }
        if (items && items[2]) {
            filterOptions += '&title=' + items[2];
        }
        var options = new http_1.RequestOptions({
            search: 'id=' + id + '&' +
                'lim=' + this.end +
                filterOptions
        });
        // FIXME relative URL
        return this.http.get("../api/query", options)
            .toPromise().then(function (res) { return res.json(); });
    };
    QueryService.prototype.getInformation = function (id, uri, lang) {
        if (!uri)
            return null;
        var options = new http_1.RequestOptions({
            search: 'id=' + id + '&' +
                'uri=' + uri + '&' +
                'lang=' + lang
        });
        // FIXME relative URL
        return this.http.get("../api/query", options)
            .toPromise().then(function (res) { return res.json(); });
    };
    return QueryService;
}());
QueryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QueryService);
exports.QueryService = QueryService;
