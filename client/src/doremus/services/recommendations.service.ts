import { INFORMATION } from '../components/auxExpressions';
import { Injectable } from '@angular/core';
import { SummaryInfo } from '../components/summaryInfo';

@Injectable()
export class RecommendationService {
  end: number;
  constructor(){this.end = 20;}

  getInformations() {
      return Promise.resolve(INFORMATION.slice(1,20));
  }

  getMoreInformation(){
      this.end += 10;
      return Promise.resolve(INFORMATION.slice(1,this.end));
  }
  // See the "Take it slow" appendix
  getInformationsSlowly() {
    return new Promise<SummaryInfo[]>(resolve =>
      setTimeout(()=>resolve(INFORMATION), 2000) // 2 seconds
    );
  }

  getInformation(id: number) {
    return Promise.resolve(INFORMATION).then(
      infos => infos.filter(info => info.id === id)[0]
    );
  }
}
