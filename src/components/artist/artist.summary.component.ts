import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'artist',
  styleUrls: ['./artist.summary.styl'],
  templateUrl: './artist.summary.template.html'
})
export class ArtistSummaryComponent {
  @Input() artist: Artist;
  @Input() ext: boolean;
  @Input() explain: any;

  ngOnChanges() {
    if (this.artist)
      this.artist.link = this.artist['@id'].replace('http://data.doremus.org/artist/', '')
  }

  writeExplain(explain) {
    let x = explain.map(y => y[0]).filter(y => y != 'period_old').join(', ')
    return 'similar ' + x;
  }
}

class Artist {
  '@id': string
  link: string
  name: any
  image: string
  additionalName: any
  birthDate: string
  deathDate: string
  description: any
  mainEntityOfPage: any
  sameAs: any
}
