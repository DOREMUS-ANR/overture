import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonLdComponent } from './jsonld.component';
import { SafeHtmlPipe } from './safehtml.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [JsonLdComponent, SafeHtmlPipe],
  exports: [JsonLdComponent]
})
export class JsonLdModule { }
