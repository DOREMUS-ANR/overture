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
var moment_ = require("moment");
var moment = moment_["default"];
var months = [
    { fr: 'janvier', en: 'january' },
    { fr: 'février', en: 'february' },
    { fr: 'mars', en: 'march' },
    { fr: 'avril', en: 'april' },
    { fr: 'mai', en: 'may' },
    { fr: 'juin', en: 'june' },
    { fr: 'juillet', en: 'july' },
    { fr: 'août', en: 'august' },
    { fr: 'septembre', en: 'september' },
    { fr: 'octobre', en: 'october' },
    { fr: 'novembre', en: 'november' },
    { fr: 'décembre', en: 'december' }
];
function toTimeSpan(str) {
    if (!str)
        return null;
    for (var _i = 0, months_1 = months; _i < months_1.length; _i++) {
        var m = months_1[_i];
        str = str.replace(m.fr, m.en);
    }
    var _a = str.split('/'), start = _a[0], end = _a[1];
    return {
        start: moment(start),
        end: moment(end)
    };
}
var TimelineComponent = (function () {
    function TimelineComponent() {
    }
    TimelineComponent.prototype.ngOnChanges = function () {
        if (!this.dates)
            return;
        this.dates.forEach(function (d) {
            d.time = new Date(d.date);
            if (!d.agent)
                d.agent = [];
        });
        this.dates.sort(function (a, b) {
            if (!a.time)
                return 1;
            if (!b.time)
                return -1;
            return a.time.start - b.time.start;
        });
    };
    return TimelineComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TimelineComponent.prototype, "dates", void 0);
TimelineComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './timeline.template.html',
        selector: 'timeline'
    })
], TimelineComponent);
exports.TimelineComponent = TimelineComponent;
