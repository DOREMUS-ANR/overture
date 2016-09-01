import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { WorkSubDetail, WorkSubDetailService } from '../../services/workSubDetail.service';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'my-work-subdetail',
  templateUrl: 'workSubDetail.template.html'
})

export class WorkSubDetailComponent {
  subDetail: WorkSubDetail;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: WorkSubDetailService) { }
  private sub: any;


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      if (!id) return;
      this.service.getSubDetail(id).then(subDetail => this.subDetail = subDetail);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
