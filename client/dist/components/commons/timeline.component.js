System.register(["@angular/core", "moment"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
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
    var core_1, moment_, moment, months, TimelineComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (moment_1) {
                moment_ = moment_1;
            }
        ],
        execute: function () {
            moment = moment_["default"];
            months = [
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
            TimelineComponent = (function () {
                function TimelineComponent() {
                }
                TimelineComponent.prototype.ngOnChanges = function () {
                    if (!this.dates)
                        return;
                    this.dates.forEach(function (d) {
                        d.time = toTimeSpan(d.date);
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
                    moduleId: __moduleName,
                    templateUrl: 'timeline.template.html',
                    selector: 'timeline'
                })
            ], TimelineComponent);
            exports_1("TimelineComponent", TimelineComponent);
        }
    };
});
