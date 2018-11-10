import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from '@shared/config/config.service';
import {News} from '@shared/models/News';
import {NewsDataService} from '@shared/news-data.service';
import {Subscription} from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  periodFilter: string;
  ratingFilter: string;
  newsList: Array<News>;
  _subscribe: Subscription;

  constructor(
    private newsService: NewsDataService,
    private configService: ConfigService,
    private routingService: AppRoutingService,
  ) {
    this.newsList = [];
  }

  ngOnInit() {
    //Просим у сервиса данных - данные о каком-то количестве новостей
    let numberOfNews = this.configService.getNumberOfNews();

    this._subscribe = this.routingService.getActiveQueryParam().subscribe( _ => {
      let page = this.routingService.getQueryParam(CONSTANTS.QUERY.PAGE);
      let period = this.routingService.getQueryParam(CONSTANTS.QUERY.PERIOD);
      let rating = this.routingService.getQueryParam(CONSTANTS.QUERY.RATING);

      page = page? page : "1";          // Значения по умолчанию
      period = period? period : 'week'; // Значения по умолчанию
      rating = rating? rating : '10';   // Значения по умолчанию
      this.onPeriodChange(period);  this.onRatingChange(rating);
      this.newsList = this.newsService.getMockNewsList(numberOfNews, parseInt(page), period, rating);
    });
  }
  ngOnDestroy(): void {
    this._subscribe.unsubscribe();
  }

  onRatingChange(value: string): void {
    // Выполняем сброс страницы на 1ю
    this.ratingFilter = value;
  }
  onPeriodChange(value: string): void {
    // Выполняем сброс страницы на 1ю
    this.periodFilter = value;
  }
}
