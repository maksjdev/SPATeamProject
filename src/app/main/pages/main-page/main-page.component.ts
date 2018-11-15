import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from '@shared/config/config.service';
import {News} from '@shared/models/News';
import {NewsDataService} from '@shared/news-data.service';
import {Subscription} from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';
import {PaginationItem} from '@shared/models/PaginationItem';
import {debounceTime, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  periodFilter: string;
  ratingFilter: string;
  pagination: PaginationItem;

  adv: Advertising;
  newsList: Array<News>;
  _subscribe: Subscription;

  constructor(
    private newsService: NewsDataService,
    private configService: ConfigService,
    private routingService: AppRoutingService,
  ) {
    this.newsList = [];
    this.adv =  new Advertising('Burger King',
      'https://burgerking.ru/images/actions/BK-2037_CHEESY_710х459_.jpg',
      'https://burgerking.ru/actions');
  }

  ngOnInit() {
    //Просим у сервиса данных - данные о каком-то количестве новостей
    let numberOfNews = this.configService.getNumberOfNews();

    this._subscribe = this.routingService.getActiveQueryParam().pipe(throttleTime(100)).subscribe( _ => {
      let page = this.routingService.getQueryParam(CONSTANTS.QUERY.PAGE);
      let period = this.routingService.getQueryParam(CONSTANTS.QUERY.PERIOD);
      let rating = this.routingService.getQueryParam(CONSTANTS.QUERY.RATING);

      page = page? page : "1";          // Значения по умолчанию
      period = period? period : 'week'; // Значения по умолчанию
      rating = rating? rating : '10';   // Значения по умолчанию

      this.onRatingChange(rating); this.onPeriodChange(period); this.onPaginationChange(parseInt(page));
      this.newsList = this.newsService.getNewsFromServer(parseInt(page), period, rating);
    });
  }
  ngOnDestroy(): void {
    this._subscribe.unsubscribe();
  }

  onRatingChange(value: string): void {
    this.ratingFilter = value;
  }
  onPeriodChange(value: string): void {
    this.periodFilter = value;
  }
  onPaginationChange(page: number): void {
    // Получаем пагинацию с сервера
    let minPage: number = 1,  maxPage: number = 100, pageLargeStep: number = 10;
    if (page >= minPage && page < maxPage) {
      this.pagination = PaginationItem.createPageItem(page, pageLargeStep, minPage, maxPage);
    }
  }
}
