import {Component} from '@angular/core';
import {TopNavComponent} from './top-nav/top-nav.component';
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
