import {Component, Output, EventEmitter} from '@angular/core';
import {QueryService} from "../../services/queries.service";
import {Globals } from '../../app.globals';

declare var __moduleName: string;

export class Vocabulary {
  id: string;
  text: string;

  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

@Component({
  moduleId: __moduleName,
  selector: 'search-comp',
  templateUrl: 'search.template.html',
  styleUrls: ['./search.css'],
  providers: [QueryService, Globals]
})
export class SearchComponent {
  @Output() onFilterChanged = new EventEmitter();
  filter = {
    key: '',
    genre: ''
  };

  itemsKey: Vocabulary[];
  itemsGenre: Vocabulary[];
  private disabled: boolean = false;

  constructor(private _queriesService: QueryService, private globals: Globals) {

    this._queriesService.getInformation('vocabulary', 'http://data.doremus.org/vocabulary/key/', globals.lang)
      .then(
      queryVoc => this.itemsKey = this.queryBindVoc(queryVoc),
      error => console.error('Error: ' + error)
      );
    this._queriesService.getInformation('vocabulary', 'http://data.doremus.org/vocabulary/genre/', globals.lang)
      .then(
      queryVoc => this.itemsGenre = this.queryBindVoc(queryVoc),
      error => console.error('Error: ' + error)
      );
  }

  queryBindVoc(query) {
    var bindings = query.results.bindings;
    var results: Vocabulary[] = [];
    for (let binding of bindings) {
      var result = new Vocabulary(binding["uri"].value, binding["label"].value);
      results.push(result);
    }
    return results;
  }

  onSelectChanged({id}, label) {
    this.filter[label] = id;
    this.onFilterChanged.emit(this.filter);
  }

  changeFilter(event: any) {
    this.onFilterChanged.emit(this.filter);
  }
}
