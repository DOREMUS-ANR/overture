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
  @Input() ext: boolean;

  getSourceImage(source: String) {
    if (!source) return null;
    let s = source.toLowerCase()
      .replace(/http:\/\/data\.doremus\.org\/(organization\/)?/, '');

    switch (s) {
      case 'bnf':
      case 'bnf':
        return `${LOGOS_FOLDER}/bnf.png`;
      case 'philharmonie':
      case 'philharmonie_de_paris':
      case 'euterpe':
        return `${LOGOS_FOLDER}/philharmonie.png`;
      case 'redomi':
      case 'itema3':
      case 'radio_france':
        return `${LOGOS_FOLDER}/radiofrance.png`;
      default:
        if (source.startsWith('http://catalogue.bnf.fr/'))
          return `${LOGOS_FOLDER}/bnf.png`;
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
  tag: string
}
