import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ExpressionService } from '../expression/expression.service';
import { isPlatformBrowser } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { State } from './state'

var states = [
  new State('http://data.doremus.org/expression/d72301f0-0aba-3ba6-93e5-c4efbee9c6ea'),
  new State('http://data.doremus.org/expression/f2828b0c-24b7-3f5c-8b27-d70778e1b449')
];


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


var timer;

@Component({
  moduleId: module.id,
  selector: 'eval',
  templateUrl: './eval.template.html',
  styleUrls: ['./eval.styl'],
  providers: [ExpressionService]
})
export class EvaluationComponent {
  expression: any;
  recommendation: Array<any>;
  trash: Array<any> = [];
  loading: boolean = true;
  error: boolean = false;

  state: number;
  statesMax = states.length + 1;
  sentState = '';
  comment: String;

  constructor(private http: HttpClient,
    private expressionService: ExpressionService,
    @Inject(PLATFORM_ID) private platformId: string) {

    let hash = window.location.hash;
    this.state = (hash && parseInt(hash.substr(1))) || 1;

    if (isPlatformBrowser(this.platformId)) this.changeSeed();

    timer = setInterval(() => this.saveState(), 5000);
  }

  ngOnDestroy() {
    clearInterval(timer);
  }

  nextState() {
    this.sentState = '';
    this.saveState();
    if (this.state >= this.statesMax)
      return;

    this.state++;
    this.changeSeed();
  }

  previousState() {
    this.saveState();

    if (this.state <= 1)
      return;

    this.state--;
    this.changeSeed();
  }

  saveState() {
    if (this.state == this.statesMax) return;
    let curstate = states[this.state - 1];

    curstate.trash = this.trash;
    curstate.rec = this.recommendation;
    curstate.loaded = true;
    localStorage.setItem(this.state.toString(), JSON.stringify(curstate));
  }

  changeSeed() {
    window.location.hash = '#' + this.state;

    this.error = false;
    this.loading = false;

    if (this.state == this.statesMax) return;

    this.loading = true;
    this.recommendation = null;
    this.trash = [];

    let curstate = states[this.state - 1];
    let seed = curstate.seed;
    let id = seed.replace('http://data.doremus.org/expression', '');

    this.expressionService.get(id).subscribe(exp => {
      this.expression = exp;
      this.expression.id = id;
      this.expression.composer = this.getProp('composer', true)[0];
    });

    if (curstate.loaded) {
      this.loading = false;
      this.recommendation = curstate.rec;
      this.trash = curstate.trash;

      return;
    }

    let x = localStorage.getItem(this.state.toString());
    if (x) {
      curstate = State.from(JSON.parse(x));

      states[this.state - 1] = curstate;
      this.recommendation = curstate.rec || [];
      this.trash = curstate.trash || [];
      this.loading = false;
      return;
    }
    // retrieve recommendations
    this.expressionService.recommend(id, 10)
      .then(res => {
        this.loading = false;
        this.recommendation = res;
      }).catch(err => {
        this.loading = false;
        this.error = true;
        console.error(err);
      });

  }

  drop(event: CdkDragDrop<string[]>) {
    let curstate = states[this.state - 1];
    curstate.modified = true;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getProp(prop, asArray: boolean = false) {
    let v = this.expression[prop];
    if (!v) return asArray ? [] : null;
    if (asArray && !Array.isArray(v)) return [v];
    return v;
  }

  shouldBeDisabled() {
    if (this.sentState) return true;

    let a = states.findIndex(function isInvalid(state, i) {
      if (!state.loaded) {
        let x = localStorage.getItem((i + 1).toString());
        if (!x) return true;
        state = State.from(JSON.parse(x));
        states[i] = state;
      }
      return !state.modified;
    });

    return a > -1 ? a + 1 : false;
  }

  sendData() {
    if (this.shouldBeDisabled()) {
      this.sentState = 'error';
      return console.warn('submit even if disabled!');
    }

    this.sentState = 'pending';
    let obj = {
      states,
      comment: this.comment
    }

    this.http.post('/api/eval/', obj, httpOptions)
      .subscribe(
        () => { this.sentState = 'success'; },
        error => {
          this.sentState = 'error';
          console.error(error);
        }
      );
  }
}
