import {Component, OnInit} from '@angular/core';
import { Router, RouteSegment, OnActivate, RouteTree, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {NgStyle, NgClass} from '@angular/common'

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'expression-tab',
  templateUrl: 'expression-tab.template.html',
  directives: [MdToolbar, NgStyle, NgClass]
})

export class ExpressionTabComponent{
  display='none';
  class = 'menu-icon icon-plus';
  openInstruments()  {
    this.display = this.display.match('none') ? 'inline' : 'none' ;
    this.class = this.display.match('none') ? 'menu-icon icon-plus' : 'menu-icon icon-minus' ;
  }
}
