import {Component, Output, EventEmitter} from '@angular/core';
import {QueryService} from "../../services/queries.service";
import {VocabularyService} from './vocabulary.service';
import {Globals } from '../../app.globals';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'search-comp',
  templateUrl: './search.template.html',
  styleUrls: ['./search.css'],
  providers: [VocabularyService, Globals]
})
export class SearchComponent {
  @Output() onFilterChanged = new EventEmitter();
  filter = {};

  itemsKey: Object[];
  itemsGenre: Object[];
  itemsMop: Object[];

  constructor(private _vocabularyService: VocabularyService, private globals: Globals, private route: ActivatedRoute) {
    this._vocabularyService.get('key')
      .then(voc => {
        this.itemsKey = voc.map((item) => ({
          value: item.uri.value,
          label: item.label.value
        }));
        setTimeout(() => this._loadFilter(), 0);
      }, error => console.error('Error: ' + error));

    this._vocabularyService.get('iaml/genre')
      .then(voc => {
        this.itemsGenre = voc.map((item) => ({
          value: item.uri.value,
          label: item.label.value
        }));
        setTimeout(() => this._loadFilter(), 0);
      }, error => console.error('Error: ' + error));

    this._vocabularyService.get('iaml/mop')
      .then(voc => {
        this.itemsMop = voc.map((item) => ({
          value: item.uri.value,
          label: item.label.value
        }));
        setTimeout(() => this._loadFilter(), 0);
      }, error => console.error('Error: ' + error));
  }

  ngOnInit() {
    this._loadFilter();
  }

  private _loadFilter() {
    Object.assign(this.filter, this.route.queryParams['value'])
  }

  changeFilter(event: any) {
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
