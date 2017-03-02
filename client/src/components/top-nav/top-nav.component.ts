import {Component} from '@angular/core';
import {SharedService} from '../../services/sharedService.service';

@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: './top-nav.template.html',
  styleUrls: ['./top-nav.css']
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
