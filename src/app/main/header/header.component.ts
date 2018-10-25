import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = "Default";

  navLinks = [
    {path: '/main',     label: 'main', active: 'active', icon: 'icon-home'},
    {path: '/news', label: 'news', active: 'active', icon: 'icon-news'},
  ];

  constructor() { }

  ngOnInit() {

  }

  public menuItemClick(event){
    console.info('You click on link!')
  }
}
