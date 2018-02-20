import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../app.globals';
import { isPlatformBrowser } from '@angular/common';

const headerOpacityThreshold = 300;

var localStorage;
if (!isPlatformBrowser(this.platformId))
  localStorage = {
    _data: {},
    setItem: function(id, val) { return this._data[id] = String(val); },
    getItem: function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
    removeItem: function(id) { return delete this._data[id]; },
    clear: function() { return this._data = {}; }
  };
else  localStorage = window.localStorage;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.template.html',
  host: {
    '(window:scroll)': 'updateHeaderOpacity($event)'
  }
})
export class AppComponent {
  showSearch: boolean = false
  headerOpacity: number = 0
  curLang: string = 'en'

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title, private translate: TranslateService,
    private globals: Globals) {
    // this language will be used as a fallback when a translation
    // isn't found in the current language
    translate.setDefaultLang('en');
    translate.use('en');

    this.curLang = localStorage.getItem('lang') || translate.getBrowserLang()
    translate.use(this.curLang);
    Globals.lang = this.curLang;
    setTimeout(() => {
      console.log('Current language:', this.translate.currentLang);
      localStorage.setItem('lang', this.translate.currentLang)
    }, 100);
  }

  ngOnInit() {
    // set title based on the title of the route in app.routes.ts
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        if (!event.title)
          return this.titleService.setTitle('Overture');

        this.translate.get(event.title)
          .subscribe(title =>
            this.titleService.setTitle(title || 'Overture'));
      });
  }

  updateHeaderOpacity(evt) {
    let currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    let headerOpacity = isNaN(currPos) ? 0 : currPos / headerOpacityThreshold;
    this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity;
  }

  onLangChange() {
    localStorage.setItem('lang', this.curLang);
    location.reload();
  }

}
