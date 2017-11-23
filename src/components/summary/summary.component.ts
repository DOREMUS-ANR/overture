import { Component, Input } from '@angular/core';

const LOGOS_FOLDER = "/static/img/logos";

@Component({
  moduleId: module.id,
  selector: 'summary',
  templateUrl: './summary.template.html'
})
export class SummaryComponent {
  @Input() entity: Entity;
  @Input() eclass: string = 'expression'; //entity class, i.e. expression

  getSourceImage(source: String) {
    if (!source) return null;

    let s = source.replace('http://data.doremus.org/', '');

    switch (s) {
      case 'bnf':
        return `${LOGOS_FOLDER}/bnf.png`;
      case 'philharmonie':
      case 'euterpe':
        return `${LOGOS_FOLDER}/philharmonie.png`;
      case 'redomi':
      case 'itema3':
        return `${LOGOS_FOLDER}/radiofrance.png`;
      default:
        return null;
    }
  }
}

class Entity {
  title: string
  small: string
  image: string
  link: string
  super: number
  source: string
}
