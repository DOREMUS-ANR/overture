import { WorkSubDetail } from '../components/work-tab/workSubDetail';
import { DETAILS } from '../components/work-tab/auxDetails';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkSubDetailService {
  getSubDetails() {
    return Promise.resolve(DETAILS);
  }

  // See the "Take it slow" appendix
  getSubDetailsSlowly() {
    return new Promise<WorkSubDetail[]>(resolve =>
      setTimeout(()=>resolve(DETAILS), 2000) // 2 seconds
    );
  }

  getSubDetail(id: number) {
    return Promise.resolve(DETAILS).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
