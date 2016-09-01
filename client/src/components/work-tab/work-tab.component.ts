import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WorkSubDetailComponent} from './workSubDetail.component';
import {WorkSubDetail,WorkSubDetailService} from '../../services/workSubDetail.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'work-tab',
  inputs: ['display'],
  templateUrl: 'work-tab.template.html',
  providers: [WorkSubDetailService],
})

export class WorkTabComponent {
  subDetails: WorkSubDetail[];
  display = 'flex';
  class = 'menu-icon icon-minus';
  composed = 'Composed Of...';

  constructor(
    private service: WorkSubDetailService,
    private router: Router) { }

  ngOnInit() {
    this.service.getSubDetails().then(subDetails => this.subDetails = subDetails);
  }

  showDetails() {
    this.display = this.display.match('none') ? 'flex' : 'none';
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus';
    this.composed = this.display.match('none') ? 'Composed Of...' : 'Composed Of';
  }

  wip() {
    this.router.navigate(['wip']);
  }
}
