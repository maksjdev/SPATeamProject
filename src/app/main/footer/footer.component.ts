import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  referLinks = [
    {name: 'О сайте', link: '#'},
    {name: 'Служба поддержки', link: '#'},
    {name: 'Мобильное приложение', link: '#'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
