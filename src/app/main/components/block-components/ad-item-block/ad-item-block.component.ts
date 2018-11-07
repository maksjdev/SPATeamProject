import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-item-block',
  templateUrl: './ad-item-block.component.html',
  styleUrls: ['./ad-item-block.component.scss']
})
export class AdItemBlockComponent implements OnInit {
  adLinks = [
    {path: 'https://burgerking.ru/actions'}
  ];
  constructor() { }
  /*getUrl()
  {
    let myUrl = {
      'background-image' : 'url(\'../../../../../assets/images/burger_king.jpg\')'
    };
    return myUrl;
  }*/
  ngOnInit() {
  }

}
