import {Component, OnInit} from '@angular/core';
import {User} from '@shared/models/User';
import {News} from '@shared/models/News';
import {ShortenPipe} from 'ngx-pipes';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {AppStringService} from '@shared/services/app-string.service';
import {CONSTANTS} from '@shared/config/constants';
import {NewsDataService} from '@shared/news-data.service';

@Component({
  selector: 'app-news-item-block',
  templateUrl: './news-item-block.component.html',
  styleUrls: ['./news-item-block.component.scss']
})
export class NewsItemBlockComponent {
  news: News;

  constructor(
    private newsSercice: NewsDataService,
  ) {
    this.news = this.newsSercice.getMockNews();
  }

}
