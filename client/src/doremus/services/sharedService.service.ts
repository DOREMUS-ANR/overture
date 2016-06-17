import { Injectable, EventEmitter } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {
  search: boolean = false;
  public showSearch$: EventEmitter<boolean>;

  constructor() {
    this.showSearch$ = new EventEmitter();
  }

  get() : boolean {
    return this.search;
  }

  public show() {
    this.search = !this.search;
    this.showSearch$.emit(this.search);
  }

}
