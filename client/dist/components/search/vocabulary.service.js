System.register(["@angular/core", "@angular/http", "../../app.globals", "rxjs/add/operator/toPromise"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, app_globals_1, VocabularyService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            VocabularyService = (function () {
                function VocabularyService(http, globals) {
                    this.http = http;
                    this.globals = globals;
                    this.limit = 12;
                }
                VocabularyService.prototype.get = function (id) {
                    if (!id)
                        return Promise.resolve(null);
                    var search = "lang=" + this.globals.lang;
                    return this.http.get("/api/vocabulary/" + id.replace(/\//g, '-'), new http_1.RequestOptions({ search: search }))
                        .toPromise().then(function (res) {
                        var data = res.json();
                        data = data.results && data.results.bindings;
                        return data;
                    });
                };
                return VocabularyService;
            }());
            VocabularyService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, app_globals_1.Globals])
            ], VocabularyService);
            exports_1("VocabularyService", VocabularyService);
        }
    };
});
