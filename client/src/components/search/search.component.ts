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
  filter = {
    key: '',
    genre: ''
  };

  itemsKey: Object[];
  itemsGenre: Object[];

  constructor(private _vocabularyService: VocabularyService, private globals: Globals, private route: ActivatedRoute) {

    this._vocabularyService.get('key')
      .then(
      voc => {
        this.itemsKey = voc.map((item) => ({
          id: item.uri.value,
          text: (item.label || item.labelEn || item.labelAny).value
        }));
      },
      error => console.error('Error: ' + error)
      );
    this._vocabularyService.get('iaml/genre')
      .then(
      voc => {
        this.itemsGenre = voc.map((item) => ({
          id: item.uri.value,
          text: (item.label || item.labelEn || item.labelAny).value
        }));
      },
      error => console.error('Error: ' + error)
      );
  }

  ngOnInit() {
    Object.assign(this.filter, this.route.queryParams['value'])
  }

  onSelectChanged({id}, label) {
    this.filter[label] = id || '';
    this.onFilterChanged.emit(this.filter);
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
