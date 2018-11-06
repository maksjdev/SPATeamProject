import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoged: boolean = true;

  constructor() { }

  onSearch(str) {
    console.log(`Search: ${str}`);
  }
}
