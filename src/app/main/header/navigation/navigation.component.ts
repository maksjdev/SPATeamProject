import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navLinks = [
    {path: '/main',     label: 'main', class: 'active', icon: 'fa-apple', test: ''},
    {path: '/news', label: 'news', class: 'active', icon: 'fa-accusoft'},
    {path: '/news', label: 'news', class: 'active', icon: 'fa-accusoft'},
    {path: '/news', label: 'news', class: 'active', icon: 'fa-accusoft'},
  ];

  constructor() { }

  public menuItemClick(event){
    console.info('You click on link!')
  }
}
