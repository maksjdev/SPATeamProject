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
import {Category} from '@shared/models/Category';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  periodFilter: string;
  ratingFilter: string;
  categoryAll: Array<Category>;
  categoryFilter: Array<Category>;
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

    this.categoryAll = this.newsService.getCategories();
    this.categoryFilter = [];
  }

  ngOnInit() {
    //Просим у сервиса данных - данные о каком-то количестве новостей
    let numberOfNews = this.configService.getNumberOfNews();

    this._subscribe = this.routingService.getActiveQueryParam().pipe(throttleTime(100)).subscribe( _ => {
      let page: string = this.routingService.getQueryParam(CONSTANTS.QUERY.PAGE);
      let period: string = this.routingService.getQueryParam(CONSTANTS.QUERY.PERIOD);
      let rating: string = this.routingService.getQueryParam(CONSTANTS.QUERY.RATING);
      let categoryStr: string = this.routingService.getQueryParam(CONSTANTS.QUERY.CATEGORY);

      if (categoryStr && categoryStr.length > 0) {
        this.categoryFilter = this.categoryAll.filter( (value) => {
          return categoryStr.split(',').indexOf(value.name.toLowerCase()) > -1;
        });
      }
      page = page? page : "1";          // Значения по умолчанию
      period = period? period : 'week'; // Значения по умолчанию
      rating = rating? rating : '10';   // Значения по умолчанию

      this.onRatingChange(rating);
      this.onPeriodChange(period);
      this.onPaginationChange(parseInt(page));
      let categoryArr: Array<string> = this.newsService.getCategoryNames(this.categoryFilter);
      this.newsList = this.newsService.getNewsFromServer(parseInt(page), period, rating, categoryArr);
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

  onCategoryAdd(item){
    this.categoryFilter = [...this.categoryFilter];
    this.categoryFilter.push(item);
  }
  onCategoryRemove(item){
    this.categoryFilter = [...this.categoryFilter];
    let index = this.categoryFilter.findIndex((value, index) => {
      return value.name === item.value.name;
    });
    if (index > -1 ) {
      this.categoryFilter.splice(index,1);
    }
  }
  onCategoryClear(item){
    this.categoryFilter = [];
  }
}
