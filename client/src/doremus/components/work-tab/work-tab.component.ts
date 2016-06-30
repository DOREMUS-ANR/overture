import {Component, OnInit} from '@angular/core';
import {NgStyle, NgClass} from '@angular/common'
import { Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {WorkSubDetailComponent} from './workSubDetail.component';
import {WorkSubDetail} from './workSubDetail';
import {WorkSubDetailService} from '../../services/workSubDetail.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'work-tab',
  templateUrl: 'work-tab.template.html',
  directives: [MdToolbar, ROUTER_DIRECTIVES, NgStyle, NgClass],
  providers: [WorkSubDetailService],
})

export class WorkTabComponent {
  subDetails: WorkSubDetail[];
  display = 'none';
  class = 'menu-icon icon-plus';
  composed = 'Composed Of...';

  constructor(
    private service: WorkSubDetailService,
    private router: Router) { }

  ngOnInit() {
    this.service.getSubDetails().then(subDetails => this.subDetails = subDetails);
  }

  showDetails() {
    this.display = this.display.match('none') ? 'inline' : 'none';
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
    this.composed = this.display.match('none') ? 'Composed Of...' : 'Composed Of';
  }

  wip() {
    this.router.navigate(['wip']);
  }
}
