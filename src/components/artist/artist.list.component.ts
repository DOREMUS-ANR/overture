import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {Globals } from '../../app.globals';
import {ArtistService} from './artist.service';

@Component({
  moduleId: module.id,
  templateUrl: './artist.list.template.html',
  // styleUrls: ['./expression.styl'],
  providers: [ArtistService]
})

export class ArtistListComponent {
  @Input() artistURI: string;

  items: any[];
  filter = {};
  querying: boolean = false;
  error: boolean = false;

  scrollInProgress = false;

  constructor(
    private _artistService: ArtistService,
    private router: Router, private globals: Globals, private route: ActivatedRoute) {
    this.globals = globals;
  }

  ngOnInit() {
    this.filter = this.route.queryParams['value'];
    this.getList();

    this.router.events
      .map(event => event instanceof NavigationStart)
      .subscribe(() => {
        let newFilter = this.route.queryParams['value'];
        if (JSON.stringify(newFilter) != JSON.stringify(this.filter)) {
          this.filter = newFilter;
          this.getList();
        }
      }, (err) => {
        this.error = true;
        console.error(err);
      });
  }

  getList() {
    // if (this.querying) return false;
    this.querying = true;
    this.error = false;

    this._artistService.query(this.filter).subscribe(
      res => {
        this.items = res['@graph'];
        this.items.forEach(a => a.link = [a['@id'].replace('http://data.doremus.org/artist/', '')])
        this.querying = false;
      },
      error => {
        console.error('Error: ' + error);
        this.querying = false;
        this.error = true;
      }
    );
  }

  onFilterChanged(filter = {}) {
    this.router.navigate(['/artist'], {
      queryParams: filter
    });
  }

  onScroll() {
    if (this.scrollInProgress || !this.items) return;
    this.scrollInProgress = true;

    this._artistService.query(this.filter, this.items.length).subscribe(res => {
      this.scrollInProgress = false;
      let newItems = res['@graph'];
      newItems.forEach(a => a.link = [a['@id'].replace('http://data.doremus.org/artist/', '')])

      this.items.push(...newItems);
    }, error => console.error('Error: ' + error));
  }

  myIdChange(event) {
    this.artistURI = '<' + event.value + '>';
    this.ngOnInit();
    window.scrollTo(0, 0);
  }

  wip() {
    this.router.navigate(['/wip']);
  }
}
