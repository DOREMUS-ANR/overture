import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'top-info',
  template: `
  <div class='square-box'>
    <div class='square-content'>
      <div class="main-video">
        <iframe id="video1" src="https://www.youtube.com/embed/PprEQF9C0Qk" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class='main-text'>
        <h2 id="title0">Improve music description to foster music exchange and reuse</h2>
        <p>We create a FRBRoo-based data model and multilingual controlled vocabularies specifically designed for music, along with documentation, examples and tutorials.</p>
        <h2 id="title1">Travel to the heart of the musical archives of major French institutions</h2>
        <p>We publish musical metadata coming form BnF, Radio France and Philharmonie de Paris on the web of data, and align datasets together with the major hubs of the Linked Open Data cloud.</p>
        <h2 id="title2">Conect sources, multiply usage, enrich user experience</h2>
        <p>We develop a musical recommendation system based on the enriched data model and the interconnection of musical catalogs, in order to offer innovative services.</p>
      </div>
    </div>
    <br>
  </div>
  <br>
  <div style="width: 10%; margin: 0 auto; position:relative; top: 60px;">
    <a  (click)="goToSearch()" class="btn btn-primary">Start Discovering!</a>
  </div>
  `,
})

export class TopInfoComponent {
  constructor(private router: Router){
  }

  goToSearch() {
    let link = ['Search'];
    this.router.navigate(link);
  }
}
