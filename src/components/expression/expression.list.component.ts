import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Globals } from '../../app.globals';
import { ExpressionService } from './expression.service';

@Component({
  moduleId: module.id,
  templateUrl: './expression.list.template.html',
  styleUrls: ['./expression.styl'],
  providers: [ExpressionService]
})

export class ExpressionListComponent {
  @Input() expressionURI: string;

  items: any[];
  filter = {};
  querying: boolean = false;
  error: boolean = false;

  scrollInProgress = false;
  freezeScroll = true;

  constructor(
    private _expressionService: ExpressionService,
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
    this.freezeScroll = false;

    this._expressionService.query(this.filter).subscribe(
      res => {
        this.items = res['@graph'];
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
    this.router.navigate(['/expression'], {
      queryParams: filter
    });
  }

  onScroll() {
    if (this.freezeScroll || this.scrollInProgress || !this.items) return;
    this.scrollInProgress = true;

    this._expressionService.query(this.filter, this.items.length)
      .subscribe(res => {
        this.scrollInProgress = false;
        let list = res['@graph'];
        if(list.length)
          this.items.push(...list);
        else this.freezeScroll = true;
      }, error => console.error('Error: ' + error));
  }

  myIdChange(event) {
    this.expressionURI = '<' + event.value + '>';
    this.ngOnInit();
    window.scrollTo(0, 0);
  }

  wip() {
    this.router.navigate(['/wip']);
  }
}
