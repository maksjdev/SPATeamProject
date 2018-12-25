import {Component} from '@angular/core';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navLinks = [
    {path: CONSTANTS.APP.MAIN,   label: 'Главная',  class: 'active'},
    {path: CONSTANTS.APP.NEWS+'/'+CONSTANTS.APP.CREATE,  label: 'Добавить', class: 'active'},
    {path: CONSTANTS.APP.ABOUT,  label: 'О нас', class: 'active'},
  ];

  constructor() { }

  public menuItemClick(event){
    // console.info('You click on link!')
  }
}
