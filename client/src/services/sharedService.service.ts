import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  public sharchBarVisible: boolean = false;

  public show() {
    this.sharchBarVisible = !this.sharchBarVisible;
  }
}
