import {Component} from '@angular/core';
import {Router} from '@angular/router';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'top-info',
  templateUrl: 'top-info.template.html',
})

export class TopInfoComponent {
  constructor(private router: Router) { }

  goToSearch() {
    this.router.navigate(['/expression']);
  }
}
