import {Component} from '@angular/core';
import {Router} from '@angular/router';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: 'home.template.html',
  styleUrls: ['home.css']
})

export class HomeComponent {
  constructor(private router: Router) { }

  goToSearch() {
    this.router.navigate(['/expression']);
  }
}
