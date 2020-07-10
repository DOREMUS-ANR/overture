import { Component, Input, Output, EventEmitter, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { ArtistService } from './artist.service';
import { isPlatformBrowser } from '@angular/common';


function toDescr(input) {
  if (input == null) return null;
  return input.map(d => d.text).join('\n')
}

@Component({
  moduleId: module.id,
  selector: 'artist-recommendation',
  templateUrl: './artist.recommendation.template.html'
})
export class ArtistRecommendationComponent {
  @Input() seed: string;
  @Input() n: number;
  @Input() big: boolean = true;
  @Output() bigChange = new EventEmitter<boolean>();
  weights = {
    mop: { id: 'mop', label: 'Played MoP', w: 1 },
    period: { id: 'period', label: 'Period', w: 1 },
    casting: { id: 'casting', label: 'Casting', w: 1 },
    function: { id: 'function', label: 'Function', w: 1 },
    genre: { id: 'genre', label: 'Genre', w: 1 },
    key: { id: 'key', label: 'Key', w: 1 },
  }
  //   mop birth_date death_date casting function genre key
  // 3 1 1 3 3 3 3

  recommendation: [any];
  loading: boolean = true;
  error: boolean = false;

  constructor(private artistService: ArtistService, @Inject(PLATFORM_ID) private platformId: Object) { };

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.seed) return;
    this.callRecommender();
  }

  getWeightsAsArray(): any[] {
    return Object.keys(this.weights)
      .map(k => this.weights[k]);
  }

  getWeightsAsInts(): number[] {
    return this.getWeightsAsArray().map(o => o.w);
  }

  private callRecommender() {
    this.loading = true;
    this.error = false;
    this.recommendation = null;

    let id = this.seed.replace('http://data.doremus.org/artist/', '');

    if (isPlatformBrowser(this.platformId)) {
      // retrieve recommendations
      this.artistService.recommend(id, this.n, this.big ? this.getWeightsAsInts() : null, !this.big)
        .then((res) => {
          this.loading = false;
          res.forEach(a => a.description = toDescr(a.description))
          this.recommendation = res;
        }, (err) => {
          this.loading = false;
          this.error = true;
          console.error(err);
        });
    }

  }

  refresh() {
    console.log(this.getWeightsAsInts())
    this.callRecommender();
  }

  toogleView() {
    this.big = !this.big;
    this.bigChange.emit(this.big);
  }

}
