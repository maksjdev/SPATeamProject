import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from '@shared/config/config.service';
import {News} from '@shared/models/News';
import {NewsDataService} from '@shared/news-data.service';
import {Subscription} from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';
import {PaginationItem} from '@shared/models/PaginationItem';
import {switchMap, throttleTime} from 'rxjs/operators';
import {Category} from '@shared/models/Category';
import {CategoryDataService} from '@shared/category-data.service';
import {ParamMap} from '@angular/router';

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
  _subscriptionC: Subscription;
  _subscriptionN: Subscription;

  constructor(
    private newsService: NewsDataService,
    private configService: ConfigService,
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
  ) {
    this.newsList = [];
    this.adv =  new Advertising('Burger King',
      'https://burgerking.ru/images/actions/BK-2037_CHEESY_710х459_.jpg',
      'https://burgerking.ru/actions');
    this.categoryFilter = [];
  }

  ngOnInit() {
    this._subscriptionC = this.categoryService.getAllCategories().subscribe((value: Array<Category>) => {
      this.categoryAll  = value;
    });

    //Просим у сервиса данных - данные о каком-то количестве новостей
    let numberOfNews = this.configService.getNumberOfNews();
    this._subscriptionN = this.routingService.getActiveQueryParam().pipe(
      throttleTime(100),
      switchMap((params: ParamMap) => {
        let page: string = params.get(CONSTANTS.QUERY.PAGE);
        let period: string = params.get(CONSTANTS.QUERY.PERIOD);
        let rating: string = params.get(CONSTANTS.QUERY.RATING);
        let categoryStr: string = params.get(CONSTANTS.QUERY.CATEGORY);

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

        let categoryArr: Array<string> = this.categoryService.getCategoryNames(this.categoryFilter);
        return this.newsService.getNewsFromServer(parseInt(page), period, rating, categoryArr);
      })
    ).subscribe( (news: Array<News>) => {
      this.newsList = news;
    });
  }
  ngOnDestroy(): void {
    this._subscriptionC.unsubscribe();
    this._subscriptionN.unsubscribe();
  }

  onRatingChange(value: string): void {
    this.ratingFilter = value;
  }
  onPeriodChange(value: string): void {
    this.periodFilter = value;
  }
  onCategoriesChange(value: string): void {
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
