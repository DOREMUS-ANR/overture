import {Component, Output, EventEmitter} from '@angular/core';
// import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
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
  providers: [QueryService, Globals]
})
export class SearchComponent {
  @Output() filterChange = new EventEmitter();

  public filterOptions: Array<string> = [null, null, null]; /*key, genre, title*/

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

  onSelectChanged(key, label) {
    let index;
    switch (label) {
      case 'key':
        index = 0;
        break;
      case 'genre':
      default:
        index = 1;
    }

    let old = this.filterOptions[index];
    this.filterOptions[index] = key && key.id;

    if (old == this.filterOptions[index]) return;
    this.filterChange.emit(this.filterOptions);
  }

  onTitle(event: any) {
    var options = this.filterOptions;
    options[2] = event.target.value;
    this.filterChange.emit(this.filterOptions);
  }
}
