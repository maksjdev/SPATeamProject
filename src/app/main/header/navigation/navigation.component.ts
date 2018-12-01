import {Component} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navLinks = [
    {path: '/main',   label: 'main',  class: 'active'},
    {path: '/news',   label: 'news',  class: 'active'},
    {path: '/add',  label: 'add', class: 'active'},
    {path: '/about',  label: 'about', class: 'active'},
    {path: '/demo',  label: 'demo', class: 'active'},
  ];

  constructor() { }

  public menuItemClick(event){
    // console.info('You click on link!')
  }
}
