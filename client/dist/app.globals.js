System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, Globals;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            core_1.Injectable();
            Globals = (function () {
                function Globals() {
                    this.lang = 'en';
                }
                return Globals;
            }());
            exports_1("Globals", Globals);
        }
    };
});
