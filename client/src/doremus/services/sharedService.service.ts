import { Injectable, EventEmitter } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {
  search: boolean = false;
  filterOptions: Array<string> = [null,null]; /*key, genre*/
  public showSearch$: EventEmitter<boolean>;
  public filterOptions$: EventEmitter<string[]>;

  constructor() {
    this.showSearch$ = new EventEmitter();
    this.filterOptions$ = new EventEmitter();
  }

  getSearch() : boolean {
    return this.search;
  }

  getFilterOptions() : string[] {
    return this.filterOptions;
  }

  setFilterOptions(options) {
    this.filterOptions = new Array<string>();
    for(var i in options){
      if(options[i] == "noSel"){
          var genre;
          this.filterOptions.push(genre);
      }else{
          this.filterOptions.push(options[i]);
      }
    }
  }

  public show() {
    this.search = !this.search;
    this.showSearch$.emit(this.search);
  }

  public filter() {
    this.filterOptions$.emit(this.filterOptions);
  }

  public clean(){
    this.filterOptions = [null,null];
  }
}
