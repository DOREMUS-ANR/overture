import {Component} from 'angular2/core';

@Component({
  selector: 'top-nav',
  template: `
    <div id="top_nav">
        <!--<div class="hamburger active"></div>-->
        <div class="logo">
          <a href="../">
              <div class="logo-icon" title="Return to the DOREMUS web homepage."></div>
          </a>
        </div>
        <ul>
          <!--<li id="google_translate_wrapper">
              <div class="remove-translate hidden">Remove Translate</div>
              <div id="google_translate_element"><div class="skiptranslate goog-te-gadget" dir="ltr"><div id=":0.targetLanguage" class="goog-te-gadget-simple" style="white-space: nowrap;"><img src="https://www.google.com/images/cleardot.gif" class="goog-te-gadget-icon" style="background-image: url(&quot;https://translate.googleapis.com/translate_static/img/te_ctrl3.gif&quot;); background-position: -65px 0px;"><span style="vertical-align: middle;"><a class="goog-te-menu-value" href="javascript:void(0)"><span>Seleccionar idioma</span><img src="https://www.google.com/images/cleardot.gif" width="1" height="1"><span style="border-left-width: 1px; border-left-style: solid; border-left-color: rgb(187, 187, 187);">&#8203;</span><img src="https://www.google.com/images/cleardot.gif" width="1" height="1"><span style="color: rgb(155, 155, 155);">▼</span></a></span></div></div></div>
          </li>-->

          <li id="social_media" class="menu-item">
              <div class="menu-icon icon-share"></div>
              <div class="menu-item-text multiple-line">Share With<br>Others</div>
              <ul class="share-buttons">
                  <li><a href="https://www.facebook.com/" target="_blank" title="Share on Facebook"><span  class="menu-icon icon-facebook" (click)="clickMade('facebook');"></span></a></li>
                  <li><a href="https://twitter.com/" target="_blank" title="Tweet"><span class="menu-icon icon-twitter" (click)="clickMade('twitter');"></span></a></li>
                  <li><a href="https://plus.google.com/" target="_blank" title="Share on Google+"><span class="menu-icon icon-gplus" (click)="clickMade('gplus');"></span></a></li>
                  <li><a title="Email (using your default email client)"><span class="menu-icon icon-mail" (click)="clickMade('mail');"></span></a></li>
              </ul>
          </li>

          <li class="menu-item" id="login">
              <a id="authorize-button">
                  <div class="menu-icon icon-user"></div>
                  <div class="menu-item-text">Sign In</div>
              </a>
          </li>
          <!--<li style="display: none;" class="menu-item" id="logout">
              <div class="menu-icon icon-logout-1"></div>
              <div class="menu-item-text">Sign Out</div>
          </li>-->
        </ul>
        <div class="main-browse" id="main_browse">
        <div id="browse">
            <div class="browse-img" (click)="clickMade('browse');"></div>
            <div class="browse-img" id="work" (click)="clickMade('work');"></div>
            <div class="browse-img" id="performance" (click)="clickMade('performance');"></div>
            <div class="browse-img" id="score" (click)="clickMade('score');"></div>
            <div class="browse-img" id="recording" (click)="clickMade('recording');"></div>
        </div>
        </div>


    </div>
  `
})

export class TopNavComponent {
    clickMade(element){
      console.log("ClickDone " + element);
    }
}
