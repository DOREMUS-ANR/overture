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
    var MdCard, MdCardHeader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MdCard = (function () {
                function MdCard() {
                }
                MdCard = __decorate([
                    core_1.Component({
                        selector: 'md-card',
                        template: "\n    <div class=\"md-card\">\n\t    <ng-content></ng-content>\n    </div>\n  ",
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [])
                ], MdCard);
                return MdCard;
            }());
            exports_1("MdCard", MdCard);
            MdCardHeader = (function () {
                function MdCardHeader() {
                }
                MdCardHeader = __decorate([
                    core_1.Component({
                        selector: 'md-card-header',
                        template: "\n    <ng-content select=\"[md-card-avatar]\"></ng-content>\n    <div class=\"md-card-header-text\">\n      <ng-content select=\"md-card-title\"></ng-content>\n      <ng-content select=\"md-card-subtitle\"></ng-content>\n    </div>\n    <ng-content></ng-content>\n  ",
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [])
                ], MdCardHeader);
                return MdCardHeader;
            }());
            exports_1("MdCardHeader", MdCardHeader);
        }
    }
});
