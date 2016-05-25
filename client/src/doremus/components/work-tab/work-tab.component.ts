import {Component, OnInit} from '@angular/core';
import {NgStyle, NgClass} from '@angular/common'
import { Router, RouteSegment, OnActivate, RouteTree, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {WorkSubDetailComponent} from './workSubDetail.component';
import { WorkSubDetail } from './workSubDetail';
import { WorkSubDetailService } from '../../services/workSubDetail.service';
declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'work-tab',
  templateUrl: 'work-tab.template.html',
  directives: [MdToolbar, ROUTER_DIRECTIVES, NgStyle, NgClass]
})

@Routes([
  {
    path: '/detail/:id',
    component: WorkSubDetailComponent,
  },
])

export class WorkTabComponent implements OnActivate {
  subDetails: WorkSubDetail[];
  display = 'none';
  class = 'menu-icon icon-plus';
  private selectedId: number;
  compossed = 'Compossed Of...';
  constructor(
    private service: WorkSubDetailService,
    private router: Router) {  }

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
    this.selectedId = +curr.getParam('id');
    this.service.getSubDetails().then(subDetails => this.subDetails = subDetails);
  }

  isSelected(subDetail: WorkSubDetail) { return subDetail.id === this.selectedId; }

  onSelect(subDetail: WorkSubDetail) {
    this.router.navigate(['/work/detail', subDetail.id]);
  }

  showDetails()  {
    this.display = this.display.match('none') ? 'inline' : 'none' ;
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus' ;
    this.compossed = this.display.match('none') ? 'Compossed Of...' : 'Compossed Of' ;
    if(this.display.match('none')) {
      this.router.navigate(['/work']);
    }
  }
}
