import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {QueryService} from "../../services/queries.service";
import {SharedService} from "../../services/sharedService.service";

declare var __moduleName: string;

export class Vocabulary {
  id: string;
  name: string;
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

@Component({
  moduleId: __moduleName,
  selector: 'search-comp',
  templateUrl: 'search.template.html',
  providers: [QueryService]
})

export class SearchComponent {
  itemsKey: Vocabulary[];
  itemsGenre: Vocabulary[];

  constructor(private _queriesService: QueryService,
              private _sharedService: SharedService) {

    this._queriesService.getInformation('vocabulary', "<http://data.doremus.org/vocabulary/key>", 'fr')
      .subscribe(
        queryVoc => this.itemsKey = this.queryBindVoc(queryVoc),
        error => console.error('Error: ' + error)
    );
   this._queriesService.getInformation('vocabulary', "<http://data.doremus.org/vocabulary/genre>", 'fr')
      .subscribe(
        queryVoc => this.itemsGenre = this.queryBindVoc(queryVoc),
        error => console.error('Error: ' + error)
     );
   }

   queryBindVoc(query) {
     var bindings = query.results.bindings;
     var results: Vocabulary[] = [];
     for(var i in bindings) {
       var binding = bindings[i];
       var result = new Vocabulary(binding["uri"].value, binding["label"].value);
       results.push(result);
     }
     return results;
   }

   loadQuery(selKey, selGenre) {
     this._sharedService.setFilterOptions([selKey, selGenre]);
     this._sharedService.filter();
   }
}
