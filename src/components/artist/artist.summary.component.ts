import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'artist',
  styleUrls: ['./artist.summary.styl'],
  templateUrl: './artist.summary.template.html'
})

export class ArtistSummaryComponent {
  @Input() artist: Artist;
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
