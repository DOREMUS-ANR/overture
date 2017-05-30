import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: './top-nav.template.html'
})

export class TopNavComponent {
  @ViewChild('fullSearchInput') fullSearchInput: ElementRef;

  showSearch: boolean = false;
  showNav: boolean = false;
  searchInput: string;

  routes: [any] = [
    {
      name: 'expression',
      label: 'Expressions'
    }, {
      name: 'performance',
      label: 'Performances'
    }, {
      name: 'recording',
      label: 'Recordings'
    }, {
      name: 'score',
      label: 'Scores'
    }, {
      name: 'artist',
      label: 'Artists'
    }];

  constructor(private router: Router) { }

  openSearch() {
    this.showSearch = true;
    this.fullSearchInput.nativeElement.focus();
  }

  closeSearch() { this.showSearch = false; }

  openNav() { this.showNav = true; }
  closeNav() { this.showNav = false; }

  onSearchSubmit(e) {
    e.preventDefault();
    // this.closeSearch();
    if (this.searchInput.split(' ').some(word => word.length > 3))
      this.router.navigate(['search', this.searchInput]);
    // else alert('At least one word should be longer then 3 character');
    // FIXME put a popup
    // this.searchInput = null;
  }
}
