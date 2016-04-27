import {Component} from 'angular2/core';
import {TopNavComponent} from './top-nav.component';
import {LeftMenuComponent} from './left-menu.component';
import {TopInfoComponent} from './top-info.component';
import {QueriesTestComponent} from './queries-test.component';

@Component({
    selector: 'my-app',
    template: `
        <top-nav></top-nav>
        <left-menu></left-menu>
        <top-info></top-info>
        <queries-test></queries-test>
        <!--<h1 style="margin-bottom: 0;">DOREMUS</h1>
        <p class="dor-sub">DOing REusable MUSical data</p>
        <h2>The new DOREMUS Web App</h2>-->
    `,
    directives: [
      TopNavComponent,
      LeftMenuComponent,
      TopInfoComponent,
      QueriesTestComponent
    ]
})

export class AppComponent {
}
