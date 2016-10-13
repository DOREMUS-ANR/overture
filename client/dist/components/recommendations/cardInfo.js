System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RecommendationCardInfo;
    return {
        setters:[],
        execute: function() {
            RecommendationCardInfo = (function () {
                function RecommendationCardInfo(id, title, subtitle) {
                    if (title === void 0) { title = null; }
                    if (subtitle === void 0) { subtitle = null; }
                    this.id = id;
                    this.title = title;
                    this.subtitle = subtitle;
                }
                return RecommendationCardInfo;
            }());
            exports_1("RecommendationCardInfo", RecommendationCardInfo);
        }
    }
});
