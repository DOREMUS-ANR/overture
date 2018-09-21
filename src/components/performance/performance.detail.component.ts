import { Component } from '@angular/core';
import { PerformanceService } from './performance.service';
import { SharedService } from '../../services/sharedService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';


const defaultOverviewPic = '/static/img/bg/violin_string.jpg';
const organizBase = 'http://data.doremus.org/organization/';
const institutions = {
  Philharmonie_de_Paris: {
    label: 'Philharmonie de Paris',
    img: '/static/img/logos/philharmonie.png',
    uri: 'https://philharmoniedeparis.fr'
  },
  BnF: {
    label: 'BnF',
    img: '/static/img/logos/bnf.png',
    uri: 'http://catalogue.bnf.fr/'
  },
  Radio_France: {
    label: 'Radio France',
    img: '/static/img/logos/radiofrance.flat.png',
    uri: 'http://www.radiofrance.fr/'
  }
}
@Component({
  moduleId: module.id,
  templateUrl: './performance.detail.template.html',
  styleUrls: ['./performance.styl'],
  providers: [PerformanceService]
})
export class PerformanceDetailComponent {
  performers: any[];
  sharedService: SharedService;
  performance: any;
  recommendation: [any];
  querying: boolean;
  error: boolean = false;
  overviewPic: string = defaultOverviewPic;

  constructor(private titleService: Title,
    sharedService: SharedService,
    private performanceService: PerformanceService,
    private route: ActivatedRoute, private _sanitizer: DomSanitizer) {

    this.sharedService = sharedService;

    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id) {
        this.querying = true;

        this.performanceService.get(id).subscribe(exp => {
          this.performance = exp['@graph'][0];
          this.performance.uri = 'http://data.doremus.org/performance/' + id;

          this.titleService.setTitle(this.performance.name);

          console.log(this.performance);
          this.querying = false;
          this.error = false;

          this.overviewPic = defaultOverviewPic;

          this.performers = this.performance.performer;
          if (!Array.isArray(this.performers)) this.performers = [this.performers];
          this.performers = this.performers.map(p => {
            p.performer.description = p.description;
            return p.performer;
          });
          this.performers = removeDuplicates(this.performers, '@id');
          console.log(this.performers)
        }, (err) => {
          this.querying = false;
          this.error = true;
          console.error(err);
        });

      }
    });
  }

  ngOnInit() {
    // FIXME discover why this is not propagated to sharedService
    this.sharedService.sharchBarVisible = false;
  }

  isNode(a) {
    return a.startsWith('node');
  }

  getSource(source) {
    let s = source
      .replace('http://data.doremus.org/', '')
      .replace('organization/', '');
    // console.log(s)
    let org = null;
    switch (s) {
      case 'bnf':
      case 'BnF':
        org = `BnF`; break;
      case 'philharmonie':
      case 'Philharmonie_de_Paris':
      case 'euterpe':
        org = `Philharmonie_de_Paris`; break;
      case 'redomi':
      case 'itema3':
        org = `Radio_France`; break;
    }
    return institutions[org];
  }

  getProp(prop, asArray: boolean = false) {
    let v = this.performance[prop];
    if (!v) return asArray ? [] : null;
    if (asArray && !Array.isArray(v)) return [v];
    return v;
  }

  getId(uri) {
    return uri.split('/').slice(-1)[0];
  }

  class2Label(cls: string) {
    switch (cls) {
      case 'http://erlangen-crm.org/efrbroo/F31_Performance':
      case 'http://data.doremus.org/ontology#M42_Performed_performance_Creation':
        return 'Performance';
      case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
        return 'Publication'
      default: return cls;
    }
  }

  startsWithNum(what) {
    return parseInt(what[0]) != NaN;
  }

  safePic(input) {
    let uri = encodeURI(input);
    return this._sanitizer.bypassSecurityTrustStyle(`url('${uri}')`);
  }
}

function removeDuplicates(myArr: any[], prop: string) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
