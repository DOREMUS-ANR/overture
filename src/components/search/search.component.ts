import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VocabularyService } from './vocabulary.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'search-comp',
  templateUrl: './search.template.html',
  styleUrls: ['./search.styl'],
  providers: [VocabularyService]
})
export class SearchComponent {
  @Input() context: string = 'expression';
  @Output() onFilterChanged = new EventEmitter();
  filter = {
    mop: null,
    genre: null,
    key: null,
    title: null,
    composer: null,
    year: null
  };

  search = {
    key: new FormControl(),
    genre: new FormControl(),
    mop: new FormControl()
  }

  result = {
    key: [],
    genre: [],
    mop: []
  };

  constructor(private _vocabularyService: VocabularyService, private route: ActivatedRoute) {
    console.log(this)
    console.log(this.result)
    for (let x of ['key', 'genre', 'mop'])
      this.search[x].valueChanges.subscribe(data => {
        this._vocabularyService.search(x, data).subscribe(response => {
          this.result[x] = response
        });
      })
  }

  ngOnInit() {
    this._loadFilter();
  }

  private _loadFilter() {
    let params = this.route.queryParams['value'];
    Object.keys(params).forEach(p => {
      let v = params[p];
      console.log(p, v);

      if (Array.isArray(this.filter[p])) {
        if (Array.isArray(v))
          this.filter[p].push(...v)
        else this.filter[p].push(v)
      }
      else this.filter[p] = v
    });

    for (let x of ['key', 'genre', 'mop'])
      if (this.filter[x])
        this._vocabularyService.lemma(x, this.filter[x]).subscribe(response => {
          this.search[x].setValue(response);
        });
  }

  emptyFilter(value: any, name: string) {
    if (value) return
    this.filter[name] = Array.isArray(this.filter[name]) ? [] : null;
    this.changeFilter('', '');
  }

  changeFilter(_event: any, name: string) {
    if (_event === null) return;
    if (this.filter.year && !this.filter.year.match(/\d{4}/)) return;

    if (_event.option) {
      this.filter[name] = _event.option.value.id;
    }
    debounce(() => {
      this.onFilterChanged.emit(this.filter);
    }, 500)();
  }

  toBeShown(x: string) {
    switch (x) {
      case 'title':
      case 'composer':
      case 'key':
      case 'mop':
      case 'genre':
        return this.context == 'expression';
      case 'year':
      case 'place':
        return this.context == 'performance';
      default: return false;
    }
  }

  displayFn(x: any) {
    return x ? x.label : null;
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
