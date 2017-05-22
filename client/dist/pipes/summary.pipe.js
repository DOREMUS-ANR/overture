"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment");
// Entity to summary for visualisation
var SummaryPipe = (function () {
    function SummaryPipe() {
    }
    SummaryPipe.prototype.transform = function (value, eclass) {
        switch (eclass) {
            case 'expression':
                return {
                    id: value.id,
                    link: ['/expression', value.id],
                    title: value.title,
                    super: value.composer,
                    small: value.catalogue
                };
            case 'event':
            case 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation':
            case 'http://erlangen-crm.org/efrbroo/F31_Performance':
                return {
                    super: "" + (value.time ? moment(value.time).year() : '') + separator(value) + toActorList(value.activities),
                    title: value.place ? "Performance at " + value.place : 'Performance'
                };
            case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
                return {
                    super: "" + (value.time ? moment(value.time).year() : '') + separator(value) + toActorList(value.activities),
                    title: value.place ? "Publication at " + value.place : 'Publication'
                };
        }
    };
    return SummaryPipe;
}());
SummaryPipe = __decorate([
    core_1.Pipe({ name: 'summary' })
], SummaryPipe);
exports.SummaryPipe = SummaryPipe;
function separator(value) {
    return value.time && value.activities ? ', ' : '';
}
function toActorList(activities) {
    if (activities === void 0) { activities = []; }
    return activities.map(function (a) { return a.actor; }).join(', ');
}
