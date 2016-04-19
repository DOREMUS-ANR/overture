import {Component} from 'angular2/core';
import {TopNavComponent} from './top-nav.component';

@Component({
    selector: 'my-app',
    template: `
        <top-nav></top-nav>
        <!--<h1 style="margin-bottom: 0;">DOREMUS</h1>
        <p class="dor-sub">DOing REusable MUSical data</p>
        <h2>The new DOREMUS Web App</h2>-->
    `,
    directives: [TopNavComponent]
})

export class AppComponent { }
