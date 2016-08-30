System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var SharedService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SharedService = (function () {
                function SharedService() {
                    this.sharchBarVisible = false;
                    this.filterOptions = [null, null, null]; /*key, genre*/
                }
                SharedService.prototype.getFilterOptions = function () {
                    return this.filterOptions;
                };
                SharedService.prototype.setFilterOptions = function (options) {
                    this.filterOptions = new Array();
                    for (var i in options) {
                        if (options[i] == "noSel") {
                            var noSel;
                            this.filterOptions.push(noSel);
                        }
                        else {
                            this.filterOptions.push(options[i]);
                        }
                    }
                };
                SharedService.prototype.show = function () {
                    this.sharchBarVisible = !this.sharchBarVisible;
                };
                SharedService.prototype.clean = function () {
                    this.filterOptions = [null, null, null];
                };
                SharedService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SharedService);
                return SharedService;
            }());
            exports_1("SharedService", SharedService);
        }
    }
});
