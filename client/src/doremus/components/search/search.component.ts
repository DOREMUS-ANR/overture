import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

import {QueryService} from "../../services/queries.service";
import {SharedService} from "../../services/sharedService.service";
declare var __moduleName: string;

export class Vocabulary {
  id: string;
  text: string;
  constructor(id, text)
  {
    this.id = id;
    this.text = text;
  }
}

@Component({
  moduleId: __moduleName,
  selector: 'search-comp',
  templateUrl: 'search.template.html',
  providers: [QueryService],
  directives: [SELECT_DIRECTIVES]
})

export class SearchComponent{
  itemsKey: Vocabulary[];
  itemsGenre: Vocabulary[];
  private disabled:boolean = false;

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
     var options = this._sharedService.getFilterOptions();
     options[0] = (selKey == undefined) ? 'noSel': selKey.activeOption.id;
     options[1] = (selGenre == undefined) ? 'noSel': selGenre.activeOption.id;
     this._sharedService.setFilterOptions(options);
     this._sharedService.filter();
   }

   removeItem(item){
     var options = this._sharedService.getFilterOptions();
     options[0] = (item == 'key') ? 'noSel': options[0];
     options[1] = (item == 'genre') ? 'noSel': options[1];
     this._sharedService.setFilterOptions(options);
     this._sharedService.filter();
   }

   onTitle(event:any) {
     var options = this._sharedService.getFilterOptions();
     options[2] = event.target.value;
     this._sharedService.setFilterOptions(options);
     this._sharedService.filter();
   }
}
