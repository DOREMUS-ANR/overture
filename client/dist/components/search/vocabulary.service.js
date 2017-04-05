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
var vocabularies = {};
var VocabularyService = (function () {
    function VocabularyService(http, globals) {
        this.http = http;
        this.globals = globals;
        this.limit = 12;
    }
    VocabularyService.prototype.get = function (id) {
        if (!id)
            return Promise.resolve(null);
        var cache = vocabularies[id];
        if (cache)
            return Promise.resolve(cache);
        var search = "lang=" + this.globals.lang;
        return this.http.get("/api/vocabulary/" + id.replace(/\//g, '-'), new http_1.RequestOptions({ search: search }))
            .toPromise().then(function (res) {
            var data = res.json();
            data = data.results && data.results.bindings;
            vocabularies[id] = data;
            return data.sort(function (a, b) { return a.label.value > b.label.value ? 1 : -1; });
        });
    };
    return VocabularyService;
}());
VocabularyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_globals_1.Globals])
], VocabularyService);
exports.VocabularyService = VocabularyService;
