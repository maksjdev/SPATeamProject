import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  public images: Array<string>;

  constructor() {
    this.images = [
      'https://burgerking.ru/images/actions/BK-2037_CHEESY_710х459_.jpg',
      'https://burgerking.ru/images/actions/BK-0883_KUPONY14_710x459px.jpg',
      'https://burgerking.ru/images/actions/BK-2212_6-ZA-199-90_710x459px.jpg'
    ];
  }

  ngOnInit() {
  }
}
