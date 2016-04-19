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
var core_1 = require('angular2/core');
var TopNavComponent = (function () {
    function TopNavComponent() {
    }
    TopNavComponent = __decorate([
        core_1.Component({
            selector: 'top-nav',
            template: "\n    <div id=\"top_nav\">\n      <div class=\"hamburger active\"></div>\n      <div class=\"logo\">\n        <a href=\"../\">\n            <div class=\"logo-icon\" title=\"Return to the DOREMUS web homepage.\"></div>\n        </a>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TopNavComponent);
    return TopNavComponent;
}());
exports.TopNavComponent = TopNavComponent;
//# sourceMappingURL=top-nav.component.js.map