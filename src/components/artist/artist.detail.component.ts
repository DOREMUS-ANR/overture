import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArtistService } from './artist.service';
import { JsonLDvalPipe } from '../../pipes/jsonLDval.pipe';

@Component({
  moduleId: module.id,
  templateUrl: './artist.detail.template.html',
  providers: [ArtistService]
})

export class ArtistDetailComponent {
  querying: boolean;
  error: boolean = false;
  artist: any;
  compositions: [any];
  compositionShown = 4;
  performances: [any];
  sameAs: any;
  artistrec: boolean = false;

  overviewPic: string = 'img/pianist.jpg';

  constructor(private titleService: Title,
    private artistService: ArtistService,
    private route: ActivatedRoute, private jsonLDpipe: JsonLDvalPipe) {

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

        this.artist = graph.splice(0, 1)[0];
        this.artist['@context'] = 'http://schema.org';
        this.compositions = graph.filter(c => c['@type'] === 'MusicComposition');
        this.performances = graph.filter(c => c['@type'] === 'MusicEvent');

        this.sameAs = this.artist.sameAs || [];
        if (!Array.isArray(this.sameAs)) this.sameAs = [this.sameAs];
        if (this.artist.mainEntityOfPage) this.sameAs.push(this.artist.mainEntityOfPage);
        this.sameAs = this.sameAs.map(toSource);

        let mainName = this.jsonLDpipe.transform(this.artist.name);
        this.titleService.setTitle(mainName);

        this.querying = false;
        this.error = false;
      });
    });
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
