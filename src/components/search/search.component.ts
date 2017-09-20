import { Component, Output, EventEmitter } from '@angular/core';
import { QueryService } from "../../services/queries.service";
import { VocabularyService } from './vocabulary.service';
import { Globals } from '../../app.globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'search-comp',
  templateUrl: './search.template.html',
  styleUrls: ['./search.styl'],
  providers: [VocabularyService, Globals]
})
export class SearchComponent {
  @Output() onFilterChanged = new EventEmitter();
  filter = {
    mop: [],
    genre: null,
    key: null,
    title: null,
    composer: null
  };

  itemsKey: Object[];
  itemsGenre: Object[];
  itemsMop: Object[];

  constructor(private _vocabularyService: VocabularyService, private globals: Globals, private route: ActivatedRoute) {
    this._vocabularyService.get('key')
      .subscribe(voc => {
        this.itemsKey = voc.map((item) => ({
          value: item.uri.value,
          label: item.label.value
        }));
      }, error => console.error('Error: ' + error));

    this._vocabularyService.get('genre')
      .subscribe(voc => {
        this.itemsGenre = voc.map((item) => ({
          value: item.uri.value,
          label: item.label.value
        }));
      }, error => console.error('Error: ' + error));

    this._vocabularyService.get('mop')
      .subscribe(voc => {
        this.itemsMop = voc.map((item) => ({
          value: item.uri.value,
          label: item.label.value
        }));
      }, error => console.error('Error: ' + error));
  }

  ngOnInit() {
    this._loadFilter();
  }

  private _loadFilter() {
    console.log('aaaa')
    let params = this.route.queryParams['value'];
    Object.keys(params).forEach(p => {
      let v = params[p];
      console.log(p, v);

      if (Array.isArray(this.filter[p])) {
        if (Array.isArray(v))
          this.filter[p].push(...v)
        else this.filter[p].push(v)
      }
      else this.filter = v
    });
  }

  emptyFilter(f: string) {
    this.filter[f] = Array.isArray(this.filter[f]) ? [] : null;
    this.changeFilter(null);
  }

  changeFilter(event: any) {
    console.log('paaaaa')
    debounce(() => {
      this.onFilterChanged.emit(this.filter);
    }, 500)();
  }
}

// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait = 0, immediate = false) {
  var timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
