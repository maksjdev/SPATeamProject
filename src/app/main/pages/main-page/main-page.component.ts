import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from '@shared/config/config.service';
import {News} from '@shared/models/News';
import {NewsDataService} from '@shared/news-data.service';
import {Subscription} from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
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
  ratingFilter: number;
  categoryAll: Array<Category>;
  categoryFilter: Array<Category>;
  pagination: PaginationItem;

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
    this.categoryFilter = [];
    this.categoryAll = [];
  }

  ngOnInit() {
    this._subscriptionC = this.categoryService.getAllCategories().subscribe((value: Array<Category>) => {
      this.categoryAll  = value;
    });

    //Просим у сервиса данных - данные о каком-то количестве новостей
    this._subscriptionN = this.routingService.getActiveQueryParam().pipe(
      throttleTime(100),
      switchMap((params: ParamMap) => {
        let pageQuery: string = params.get(CONSTANTS.QUERY.PAGE);
        let periodQuery: string = params.get(CONSTANTS.QUERY.PERIOD);
        let ratingQuery: string = params.get(CONSTANTS.QUERY.RATING);
        let searchQuery: string = params.get(CONSTANTS.QUERY.SEARCH);
        let categoryQuery: string = params.get(CONSTANTS.QUERY.CATEGORY);

        if (categoryQuery && categoryQuery.length > 0 && this.categoryAll.length > 0) {
          this.categoryFilter = this.categoryAll.filter((value) => {
            return categoryQuery.split(',').indexOf(value.name.toLowerCase()) > -1;
          });
        }
        // Значения по умолчанию
        let defaultPage: number = this.configService.getDefaultPage();
        let page: number = pageQuery ? isNaN(parseInt(pageQuery)) ?
          defaultPage : parseInt(pageQuery) : defaultPage;

        let defaultRating: number = this.configService.getDefaultRating();
        let rating: number = ratingQuery ? isNaN(parseInt(ratingQuery)) ?
          defaultRating : parseInt(ratingQuery) : defaultRating;

        let period = periodQuery ? periodQuery : this.configService.getDefaultPeriod();

        this.onPaginationChange(page);
        this.onRatingChange(rating);
        this.onPeriodChange(period);

        let categoryId: Array<string> = this.categoryService.getCategoryBy(this.categoryFilter, 'id');
        return this.newsService.getNewsFromServer(page, periodQuery, ratingQuery, categoryId, searchQuery);
      })
    ).subscribe( (news: Array<News>) => {
      this.newsList = news;
    });
  }
  ngOnDestroy(): void {
    this._subscriptionC.unsubscribe();
    this._subscriptionN.unsubscribe();
  }

  onRatingChange(value: number): void {
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
