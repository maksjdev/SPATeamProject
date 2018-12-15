import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public copyright: string;
  public developers = {
    team: 'Elite TM',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  };
  public referLinks = [
    {name: 'О сайте', link: 'about'},
    {name: 'Поддержать нас', link: 'about'},
    {name: 'Служба поддержки', link: 'about'},
  ];

  constructor() {
    let currentYear: string = (new Date()).getFullYear().toString(10);
    this.copyright = `2017 - ${currentYear} «${this.developers.team}»`;
  }

  ngOnInit() {
  }
}


