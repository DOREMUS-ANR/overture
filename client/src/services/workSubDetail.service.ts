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
      setTimeout(() => resolve(DETAILS), 2000) // 2 seconds
    );
  }

  getSubDetail(id: number) {
    return Promise.resolve(DETAILS).then(
      details => details.filter(detail => detail.id === id)[0]
    );
  }
}

export class WorkSubDetail {
  id: number;
  name: string;
  shortname: string;
  number: number;
  def: string;
}
