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
    TopNavComponent.prototype.clickMade = function (element) {
        console.log("ClickDone " + element);
    };
    TopNavComponent = __decorate([
        core_1.Component({
            selector: 'top-nav',
            template: "\n    <div id=\"top_nav\">\n        <!--<div class=\"hamburger active\"></div>-->\n        <div class=\"logo\">\n          <a href=\"../\">\n              <div class=\"logo-icon\" title=\"Return to the DOREMUS web homepage.\"></div>\n          </a>\n        </div>\n        <ul>\n          <!--<li id=\"google_translate_wrapper\">\n              <div class=\"remove-translate hidden\">Remove Translate</div>\n              <div id=\"google_translate_element\"><div class=\"skiptranslate goog-te-gadget\" dir=\"ltr\"><div id=\":0.targetLanguage\" class=\"goog-te-gadget-simple\" style=\"white-space: nowrap;\"><img src=\"https://www.google.com/images/cleardot.gif\" class=\"goog-te-gadget-icon\" style=\"background-image: url(&quot;https://translate.googleapis.com/translate_static/img/te_ctrl3.gif&quot;); background-position: -65px 0px;\"><span style=\"vertical-align: middle;\"><a class=\"goog-te-menu-value\" href=\"javascript:void(0)\"><span>Seleccionar idioma</span><img src=\"https://www.google.com/images/cleardot.gif\" width=\"1\" height=\"1\"><span style=\"border-left-width: 1px; border-left-style: solid; border-left-color: rgb(187, 187, 187);\">&#8203;</span><img src=\"https://www.google.com/images/cleardot.gif\" width=\"1\" height=\"1\"><span style=\"color: rgb(155, 155, 155);\">\u25BC</span></a></span></div></div></div>\n          </li>-->\n\n          <li id=\"social_media\" class=\"menu-item\">\n              <div class=\"menu-icon icon-share\"></div>\n              <div class=\"menu-item-text multiple-line\">Share With<br>Others</div>\n              <ul class=\"share-buttons\">\n                  <li><a href=\"https://www.facebook.com/\" target=\"_blank\" title=\"Share on Facebook\"><span  class=\"menu-icon icon-facebook\" (click)=\"clickMade('facebook');\"></span></a></li>\n                  <li><a href=\"https://twitter.com/\" target=\"_blank\" title=\"Tweet\"><span class=\"menu-icon icon-twitter\" (click)=\"clickMade('twitter');\"></span></a></li>\n                  <li><a href=\"https://plus.google.com/\" target=\"_blank\" title=\"Share on Google+\"><span class=\"menu-icon icon-gplus\" (click)=\"clickMade('gplus');\"></span></a></li>\n                  <li><a title=\"Email (using your default email client)\"><span class=\"menu-icon icon-mail\" (click)=\"clickMade('mail');\"></span></a></li>\n              </ul>\n          </li>\n\n          <li class=\"menu-item\" id=\"login\">\n              <a id=\"authorize-button\">\n                  <div class=\"menu-icon icon-user\"></div>\n                  <div class=\"menu-item-text\">Sign In</div>\n              </a>\n          </li>\n          <!--<li style=\"display: none;\" class=\"menu-item\" id=\"logout\">\n              <div class=\"menu-icon icon-logout-1\"></div>\n              <div class=\"menu-item-text\">Sign Out</div>\n          </li>-->\n        </ul>\n        <div class=\"main-browse\" id=\"main_browse\">\n        <div id=\"browse\">\n            <div class=\"browse-img\" (click)=\"clickMade('browse');\"></div>\n            <div class=\"browse-img\" id=\"work\" (click)=\"clickMade('work');\"></div>\n            <div class=\"browse-img\" id=\"performance\" (click)=\"clickMade('performance');\"></div>\n            <div class=\"browse-img\" id=\"score\" (click)=\"clickMade('score');\"></div>\n            <div class=\"browse-img\" id=\"recording\" (click)=\"clickMade('recording');\"></div>\n        </div>\n        </div>\n\n\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TopNavComponent);
    return TopNavComponent;
}());
exports.TopNavComponent = TopNavComponent;
