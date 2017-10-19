import { Component, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { ArtistService } from './artist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'artist-recommendation',
  templateUrl: './artist.recommendation.template.html'
})
export class ArtistRecommendationComponent {
  @Input() seed: string;
  recommendation: [any];
  loading: boolean = true;
  error: boolean = false;

  constructor(private artistService: ArtistService, @Inject(PLATFORM_ID) private platformId: Object) { };

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.seed) return;

    this.loading = true;
    this.error = false;
    this.recommendation = null;

    let id = this.seed.replace('http://data.doremus.org/artist/', '');

    if (isPlatformBrowser(this.platformId)) {

      // retrieve recommendations
      this.artistService.recommend(id)
        .then((res) => {
          this.loading = false;
          res.forEach(a => a.description = a.description.map(d => d.text).join('\n'))
          this.recommendation = res;
        }, (err) => {
          this.loading = false;
          this.error = true;
          console.error(err);
        });
    }
  }

}
