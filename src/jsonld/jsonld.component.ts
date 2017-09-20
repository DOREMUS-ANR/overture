import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'jsonld',
  template: `<div [innerHtml]="'<script type=\\'application/ld+json\\'>' + jsonLdObj + '</script>' | safeHtml" style="display:none"></div>`
})
export class JsonLdComponent {
  @Input()
  object: {};

  jsonLdObj: string;

  ngOnInit() {
    this.jsonLdObj = JSON.stringify(this.object)
  }
}
