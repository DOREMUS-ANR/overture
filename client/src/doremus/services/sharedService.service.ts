import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  public sharchBarVisible: boolean = false;
  public filterOptions: Array<string> = [null,null,null]; /*key, genre*/

  getFilterOptions() : string[] {
    return this.filterOptions;
  }

  setFilterOptions(options) {
    this.filterOptions = new Array<string>();
    for(var i in options){
      if(options[i] == "noSel"){
          var noSel;
          this.filterOptions.push(noSel);
      }else{
          this.filterOptions.push(options[i]);
      }
    }
  }

  public show() {
    this.sharchBarVisible = !this.sharchBarVisible;
  }

  public clean(){
    this.filterOptions = [null,null,null];
  }
}
