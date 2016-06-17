import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {QueryService} from "../../services/queries.service";

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

  constructor(private _queriesService: QueryService) {

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
     console.log("Key: " + selKey);
     console.log("Genre: " + selGenre);

     /*this._queriesService.getInformation('searchQuery', "<"+selKey+">" + "??" + "<"+selGenre.id+">",null)
     .subscribe(
       query => this.queryResult = this.queryBind(query),
       error => console.error('Error: ' + error)
     );*/
   }
}
