import {Component, Output, EventEmitter} from '@angular/core';
import {QueryService} from "../../services/queries.service";
import {VocabularyService} from './vocabulary.service';
import {Globals } from '../../app.globals';
import {ActivatedRoute} from '@angular/router';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'search-comp',
  templateUrl: 'search.template.html',
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
    this.onFilterChanged.emit(this.filter);
  }
}
