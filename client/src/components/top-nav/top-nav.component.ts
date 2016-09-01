import {Component} from '@angular/core';
import {SharedService} from '../../services/sharedService.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'top-nav',
  templateUrl: 'top-nav.template.html',
  styleUrls: ['top-nav.css']
})

export class TopNavComponent {
  private showSearch: boolean = false;
  private sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  clickSearch() {
    this.showSearch = !this.showSearch;
    this.sharedService.sharchBarVisible = this.showSearch;
  }

}
