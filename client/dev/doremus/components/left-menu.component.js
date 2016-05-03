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
var LeftMenuComponent = (function () {
    function LeftMenuComponent() {
    }
    LeftMenuComponent.prototype.clickMade = function (element) {
        console.log("ClickDone " + element);
    };
    LeftMenuComponent = __decorate([
        core_1.Component({
            selector: 'left-menu',
            template: "\n    <div id=\"left_menu\">\n      <ul id=\"navigation\">\n          <li class=\"info\"><span (click)=\"clickMade('info');\" class=\"menu-icon icon-info-circled\"></span></li>\n          <li class=\"about\"><span (click)=\"clickMade('about');\" type=\"button\" class=\"menu-icon icon-help-circled\"></span></li>\n          <li class=\"favourites\"><span (click)=\"clickMade('favourites');\" class=\"menu-icon icon-heart-1\"></span></li>\n      </ul>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LeftMenuComponent);
    return LeftMenuComponent;
}());
exports.LeftMenuComponent = LeftMenuComponent;
