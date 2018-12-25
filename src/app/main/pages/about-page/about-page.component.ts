import { Component, OnInit } from '@angular/core';
import {ConfigService} from '@shared/config/config.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  public title: string;
  public text: string;
  public imagesArr: Array<object>;

  constructor(
    private configService: ConfigService
  ) {
    this.title = 'Информация о нашей команде «Elite Team»';
    this.imagesArr = configService.getAboutPhotos();
  }
}
