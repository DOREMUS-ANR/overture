import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ArtistService } from './artist.service';
import { JsonLDvalPipe } from '../../pipes/jsonLDval.pipe';
import { Globals } from '../../app.globals';

@Component({
  moduleId: module.id,
  templateUrl: './artist.detail.template.html',
  providers: [ArtistService]
})

export class ArtistDetailComponent {
  pFunctionList: Set<string>;
  pFunctions: {};
  functionList: Set<string>;
  functions: any;
  querying: boolean;
  error: boolean = false;
  artist: any;
  compositions: [any];
  performances: [any];
  sameAs: any;
  artistrec: boolean = false;

  overviewPic: string = 'img/pianist.jpg';

  constructor(private titleService: Title,
    private artistService: ArtistService,
    private route: ActivatedRoute, private jsonLDpipe: JsonLDvalPipe,
    private _sanitizer: DomSanitizer) {

    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (!id) return;
      this.querying = true;

      this.artistService.get(id).subscribe(a => {
        let graph = a['@graph'];
        if (!graph) {
          this.querying = false;
          this.error = true;
          return;
        }

        this.artist = graph[0];
        this.sameAs = this.artist.sameAs || [];
        if (!Array.isArray(this.sameAs)) this.sameAs = [this.sameAs];
        if (this.artist.mainEntityOfPage) this.sameAs.push(this.artist.mainEntityOfPage);
        this.sameAs = this.sameAs.map(toSource);

        let mainName = this.jsonLDpipe.transform(this.artist.name);
        this.titleService.setTitle(mainName);

        this.querying = false;
        this.error = false;
      });

      this.artistService.worksOf(id).subscribe(a => {
        let graph = a['@graph'];
        if (!graph) {
          this.querying = false;
          this.error = true;
          return;
        }

        this.compositions = graph;
        this.functions = {};
        this.functionList = new Set<string>(graph.map(x => x.author.description));
        this.functionList.forEach(fc => this.functions[fc] = 5)
        this.error = false;
      });

      this.artistService.performancesOf(id).subscribe(a => {
        let graph = a['@graph'];
        if (!graph) {
          this.querying = false;
          this.error = true;
          return;
        }

        this.performances = graph;
        this.performances.filter(x => !x.performer.description)
          .forEach(x => x.performer.description =
            Globals.lang.startsWith("fr") ? "interprète" : "performer");
        this.pFunctions = {};
        this.pFunctionList = new Set<string>(graph.map(x => x.performer.description));
        this.pFunctionList.forEach(fc => this.pFunctions[fc] = 5)
        this.error = false;
      });


    });
  }
  getByFunction(f, isPerformance = false) {
    let list = isPerformance ? this.performances : this.compositions;
    let prop = isPerformance ? 'performer' : 'author';
    return list.filter(x => x[prop].description == f);
  }
  safePic(input) {
    let uri = encodeURI(input);
    return this._sanitizer.bypassSecurityTrustStyle(`url('${uri}')`);
  }
}

function toSource(input) {
  let img = '', label = '';
  let i = input.replace(/https?:\/\/([^\/]+)\/.+/, '$1');
  switch (i) {
    case 'dbpedia.org':
      img = 'img/logos/dbpedia.png';
      label = 'DBpedia';
      break;
    case 'isni.org':
      img = 'img/logos/isni.png';
      label = 'ISNI';
      break;
    case 'viaf.org':
      img = 'img/logos/viaf.png';
      label = 'VIAF';
      break;
    case 'www.wikidata.org':
      img = 'img/logos/wikidata.png';
      label = 'WikiData';
      break;
    case 'catalogue.bnf.fr':
      img = 'img/logos/bnf.png';
      label = 'BnF';
      break;
    case 'musicbrainz.org':
      img = 'img/logos/musicbrainz.png';
      label = 'MusicBrainz';
      break;
    case 'fr.wikipedia.org':
    case 'en.wikipedia.org':
      img = 'img/logos/wikipedia.png';
      label = 'WikiPedia';
  }
  return {
    uri: input,
    img,
    label
  }

}
