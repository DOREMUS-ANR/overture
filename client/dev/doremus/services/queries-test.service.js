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
const http_1 = require('angular2/http');
require('rxjs/add/operator/map');
let QueriesService = class QueriesService {
    constructor(http) {
        this.http = http;
    }
    load(id) {
        var options = new http_1.RequestOptions({
            search: 'id=' + id
        });
        return this.http.get("http://localhost:3333/query", options)
            .map(res => res.json());
    }
};
QueriesService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], QueriesService);
exports.QueriesService = QueriesService;
//# sourceMappingURL=queries-test.service.js.map