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
      'https://pets2.me/media/res/1/4/8/4/3/14843.p30fh0.300.jpg',
      'https://i.ytimg.com/vi/FfvA-xHMvcY/hqdefault.jpg',
      'http://420on.cz/system/photo/image/000/120/450/xxlarge/panda3.jpg',
      'http://www.otakuusamagazine.com/Uploads/Public/Images/Newsletter/06-23-14/670px-0,672,0,360-MainPagePart3.png',
      'https://ci.memecdn.com/7841086.jpg'
    ];
  }

  ngOnInit() {
  }
}
