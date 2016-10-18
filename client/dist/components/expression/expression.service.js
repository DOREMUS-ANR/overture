System.register(['@angular/core', '@angular/http', '../../app.globals', 'rxjs/add/operator/toPromise'], function(exports_1, context_1) {
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
    var core_1, http_1, app_globals_1;
    var ExpressionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_globals_1_1) {
                app_globals_1 = app_globals_1_1;
            },
            function (_1) {}],
        execute: function() {
            ExpressionService = (function () {
                function ExpressionService(http, globals) {
                    this.http = http;
                    this.globals = globals;
                    this.limit = 12;
                }
                ExpressionService.prototype.query = function (filter, offset) {
                    var _this = this;
                    if (filter === void 0) { filter = {}; }
                    var filterOptions = "";
                    Object.keys(filter).forEach(function (k) {
                        if (filter[k])
                            filterOptions += "&" + k + "=" + filter[k];
                    });
                    var search = 'id=selfContainedExpressions&lim=' + this.limit + filterOptions;
                    if (offset)
                        search += '&offset=' + offset;
                    return this.http.get("../api/query", new http_1.RequestOptions({ search: search })).toPromise().then(function (res) {
                        var data = _this._processResult(res);
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var d = data_1[_i];
                            d.id = /[^/]*$/.exec(d.expression)[0];
                        }
                        return data;
                    });
                };
                ExpressionService.prototype.get = function (id) {
                    var _this = this;
                    if (!id)
                        return Promise.resolve(null);
                    var search = "id=selfContainedExpressionDet&uri=<http://data.doremus.org/expression/" + id + ">&lang=" + this.globals.lang;
                    // FIXME relative URL
                    return this.http.get("../api/query", new http_1.RequestOptions({ search: search }))
                        .toPromise().then(function (res) {
                        var data = _this._processResult(res);
                        data = _this._mergeData(data);
                        return data[0];
                    });
                };
                ExpressionService.prototype._mergeData = function (data) {
                    var output = {};
                    var _loop_1 = function(row) {
                        Object.keys(row).forEach(function (prop) {
                            var value = row[prop];
                            if (!output[prop]) {
                                output[prop] = [value];
                            }
                            else if (prop == 'keyURI') {
                                //FIXME workaround for key in @en-gb and @en-us
                                if (output['key'].length > output['keyURI'].length)
                                    output[prop].push(value);
                            }
                            else if (!output[prop].includes(value)) {
                                output[prop].push(value);
                            }
                        });
                    };
                    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                        var row = data_2[_i];
                        _loop_1(row);
                    }
                    return [output];
                };
                ExpressionService.prototype._processResult = function (res) {
                    var bindings = res.json().results.bindings;
                    bindings.forEach(function (b) {
                        Object.keys(b).forEach(function (prop) {
                            b[prop] = b[prop].value;
                        });
                    });
                    return bindings;
                };
                ExpressionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, app_globals_1.Globals])
                ], ExpressionService);
                return ExpressionService;
            }());
            exports_1("ExpressionService", ExpressionService);
        }
    }
});
