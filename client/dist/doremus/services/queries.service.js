System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var QueryService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            QueryService = (function () {
                function QueryService(http) {
                    this.end = 20;
                    this.http = http;
                }
                QueryService.prototype.getInformations = function (id, items) {
                    this.end = 10;
                    var filterOptions = "";
                    if (items != undefined && items[0] != undefined) {
                        filterOptions = '&' + 'key=' + items[0];
                    }
                    if (items != undefined && items[1] != undefined) {
                        filterOptions = filterOptions + '&' + 'genre=' + items[1];
                    }
                    if (items != undefined && items[2] != undefined) {
                        filterOptions = filterOptions + '&' + 'title=' + items[2];
                    }
                    var options = new http_1.RequestOptions({
                        search: 'id=' + id + '&' +
                            'lim=' + this.end + '&' +
                            filterOptions
                    });
                    return this.http.get("../api/query", options)
                        .map(function (res) { return res.json(); });
                };
                QueryService.prototype.getMoreInformation = function (id, items) {
                    this.end += 10;
                    var filterOptions = "";
                    if (items != undefined && items[0] != undefined) {
                        filterOptions = '&' + 'key=' + items[0];
                    }
                    if (items != undefined && items[1] != undefined) {
                        filterOptions = filterOptions + '&' + 'genre=' + items[1];
                    }
                    if (items != undefined && items[2] != undefined) {
                        filterOptions = filterOptions + '&' + 'title=' + items[2];
                    }
                    var options = new http_1.RequestOptions({
                        search: 'id=' + id + '&' +
                            'lim=' + this.end +
                            filterOptions
                    });
                    // FIXME relative URL
                    return this.http.get("../api/query", options)
                        .map(function (res) { return res.json(); });
                };
                QueryService.prototype.getInformation = function (id, uri, lang) {
                    var options = new http_1.RequestOptions({
                        search: 'id=' + id + '&' +
                            'uri=' + uri + '&' +
                            'lang=' + lang
                    });
                    // FIXME relative URL
                    return this.http.get("../api/query", options)
                        .map(function (res) { return res.json(); });
                };
                QueryService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], QueryService);
                return QueryService;
            }());
            exports_1("QueryService", QueryService);
        }
    }
});
