System.register(['../components/work-tab/auxDetails', '@angular/core'], function(exports_1, context_1) {
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
    var auxDetails_1, core_1;
    var WorkSubDetailService, WorkSubDetail;
    return {
        setters:[
            function (auxDetails_1_1) {
                auxDetails_1 = auxDetails_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            WorkSubDetailService = (function () {
                function WorkSubDetailService() {
                }
                WorkSubDetailService.prototype.getSubDetails = function () {
                    return Promise.resolve(auxDetails_1.DETAILS);
                };
                // See the "Take it slow" appendix
                WorkSubDetailService.prototype.getSubDetailsSlowly = function () {
                    return new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(auxDetails_1.DETAILS); }, 2000);
                    } // 2 seconds
                    );
                };
                WorkSubDetailService.prototype.getSubDetail = function (id) {
                    return Promise.resolve(auxDetails_1.DETAILS).then(function (details) { return details.filter(function (detail) { return detail.id === id; })[0]; });
                };
                WorkSubDetailService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WorkSubDetailService);
                return WorkSubDetailService;
            }());
            exports_1("WorkSubDetailService", WorkSubDetailService);
            WorkSubDetail = (function () {
                function WorkSubDetail() {
                }
                return WorkSubDetail;
            }());
            exports_1("WorkSubDetail", WorkSubDetail);
        }
    }
});
