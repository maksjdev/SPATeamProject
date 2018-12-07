import {Component} from '@angular/core';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navLinks = [
    {path: CONSTANTS.APP.MAIN,   label: 'main',  class: 'active'},
    {path: CONSTANTS.APP.CREATE,  label: 'create', class: 'active'},
    {path: CONSTANTS.APP.ABOUT,  label: 'about', class: 'active'},
    {path: '/demo',  label: 'demo', class: 'active'},
  ];

  constructor() { }

  public menuItemClick(event){
    // console.info('You click on link!')
  }
}
