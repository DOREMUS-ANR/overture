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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var TopNavComponent = (function () {
    function TopNavComponent(router) {
        this.router = router;
        this.showSearch = false;
        this.routes = [
            {
                name: 'expression',
                label: 'Expressions'
            }, {
                name: 'performance',
                label: 'Performances'
            }, {
                name: 'recording',
                label: 'Recordings'
            }, {
                name: 'score',
                label: 'Scores'
            }, {
                name: 'person',
                label: 'Artists'
            }
        ];
    }
    TopNavComponent.prototype.openSearch = function () {
        this.showSearch = true;
        this.fullSearchInput.nativeElement.focus();
    };
    TopNavComponent.prototype.closeSearch = function () { this.showSearch = false; };
    TopNavComponent.prototype.onSearchSubmit = function (e) {
        e.preventDefault();
        // this.closeSearch();
        if (this.searchInput.split(' ').some(function (word) { return word.length > 3; }))
            this.router.navigate(['search', this.searchInput]);
        else
            alert('At least one word should be longer then 3 character');
        // FIXME put a popup
        // this.searchInput = null;
    };
    return TopNavComponent;
}());
__decorate([
    core_1.ViewChild('fullSearchInput'),
    __metadata("design:type", core_1.ElementRef)
], TopNavComponent.prototype, "fullSearchInput", void 0);
TopNavComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'top-nav',
        templateUrl: './top-nav.template.html',
        styleUrls: ['./top-nav.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], TopNavComponent);
exports.TopNavComponent = TopNavComponent;
