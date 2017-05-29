import {Component} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Globals} from '../../app.globals';
import {SearchService} from './search.service';

@Component({
  moduleId: module.id,
  templateUrl: './search-results.template.html',
  // styleUrls: ['./expression.css'],
  providers: [SearchService]
})
export class SearchResultsComponent {
  input: string;
  items: any[];
  querying: boolean = true;
  error: boolean = false;

  constructor(
    private _searchService: SearchService,
    private router: Router, private globals: Globals, private route: ActivatedRoute) {

    this.globals = globals;

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url.startsWith('/search')) {
        this.querying = true;
        this.error = false;

      }

      if (val instanceof NavigationEnd && val.url.startsWith('/search'))
        this.search();
    });



  }

  search() {
    this.input = this.route.snapshot.params['input'];

    this.querying = true;
    this.error = false;

    this._searchService.query(this.input).then(
      res => {
        this.items = res;
        console.log(res)
        this.querying = false;
      },
      error => {
        console.error('Error: ' + error);
        this.querying = false;
        this.error = true;
      }
    );

  }
}
