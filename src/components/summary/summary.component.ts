import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'summary',
  templateUrl: './summary.template.html'
})

export class SummaryComponent {
  @Input() entity: Entity;
  @Input() eclass: string = 'expression'; //entity class, i.e. expression
}

class Entity {
  title: string
  small: string
  image: string
  link: string
  super: number
}
