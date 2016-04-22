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
var TopInfoComponent = (function () {
    function TopInfoComponent() {
    }
    TopInfoComponent = __decorate([
        core_1.Component({
            selector: 'top-info',
            template: "\n  <div class='square-box'>\n    <div class='square-content'>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TopInfoComponent);
    return TopInfoComponent;
}());
exports.TopInfoComponent = TopInfoComponent;
//# sourceMappingURL=top-info.component.js.map