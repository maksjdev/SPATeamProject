import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  public title: string;
  public text: string;
  public imagesArr: Array<object>;

  constructor() {
    this.title = 'Информация о нашей команде «Elite Team»';
    this.imagesArr = [
      {title: "Виталик", link:"https://bit.ly/2UYktXU"},
      {title: "Максим", link:"https://cdn.igromania.ru/mnt/videos/8/e/0/3/4/20366/3f40f9c8c7cb0fbd7355f1c8cb1fab54_original.jpg"},
      {title: "Славик", link:"https://cdn.igromania.ru/mnt/videos/8/e/0/3/4/20366/3f40f9c8c7cb0fbd7355f1c8cb1fab54_original.jpg"},
      {title: "Даша", link:"https://pp.userapi.com/c604531/v604531288/31cf6/jdJvnfFaUO8.jpg"}
    ]
  }

  ngOnInit() {
  }

}
