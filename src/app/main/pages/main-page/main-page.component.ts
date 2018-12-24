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
import {AppScrollService} from '@shared/services/app-scroll.service';

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

  newsList: Array<News>;
  private _subscriptionC: Subscription;
  private _subscriptionN: Subscription;

  pagination: PaginationItem;
  paginationTotal: number;
  isLoading: boolean;

  constructor(
    private newsService: NewsDataService,
    private configService: ConfigService,
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
    private scrollService: AppScrollService
  ) {
    this.newsList = [];
    this.categoryFilter = [];
    this.categoryAll = [];
  }

  ngOnInit() {
    let defaultPage: number = this.configService.getDefaultPage();
    let defaultRating: number = this.configService.getDefaultRating();

    this._subscriptionC = this.categoryService.getCurrentCategoriesData().subscribe((value: Array<Category>) => {
      if (!value) return;
      this.categoryAll  = value;
    });

    //Просим у сервиса данных - данные о каком-то количестве новостей
    this._subscriptionN = this.routingService.getActiveQueryParam().pipe(
      throttleTime(100),
      switchMap((params: ParamMap) => {
        this.isLoading = true;
        let pageQuery: string = params.get(CONSTANTS.QUERY.PAGE);
        let periodQuery: string = params.get(CONSTANTS.QUERY.PERIOD);
        let ratingQuery: string = params.get(CONSTANTS.QUERY.RATING);
        let searchQuery: string = params.get(CONSTANTS.QUERY.SEARCH);
        let categoryQuery: string = params.get(CONSTANTS.QUERY.CATEGORY);

        if (categoryQuery && categoryQuery.length > 0 && this.categoryAll && this.categoryAll.length > 0) {
          this.categoryFilter = this.categoryAll.filter((value) => {
            return categoryQuery.split(',').indexOf(value.name.toLowerCase()) > -1;
          });
        }
        // Значения по умолчанию
        let page: number = pageQuery ? isNaN(parseInt(pageQuery)) ?
          defaultPage : parseInt(pageQuery) : defaultPage;
        let rating: number = ratingQuery ? isNaN(parseInt(ratingQuery)) ?
          defaultRating : parseInt(ratingQuery) : defaultRating;
        let period = periodQuery ? periodQuery : this.configService.getDefaultPeriod();

        this.onRatingChange(rating);
        this.onPeriodChange(period);

        let categoryId: Array<string> = this.categoryService.getCategoryBy(this.categoryFilter, 'id');
        return this.newsService.getNewsFromServer(page, periodQuery, ratingQuery, categoryId, searchQuery);
      })
    ).subscribe( data => {
      this.isLoading = false;

      if (!('news' in data) || !('pagination' in data)) return;
      this.newsList = data.news;

      let pagination = data.pagination,
          page = parseInt(pagination['current_page']),
          total = parseInt(pagination['total_page']);
      this.paginationTotal = total;
      page > this.paginationTotal? this.onPaginationChange(defaultPage) : this.onPaginationChange(page);
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
  onPaginationChange(pageCurrent: number): void {
    let minPage: number = 1,  maxPage: number = this.paginationTotal, pageLargeStep: number = 5;
    if (pageCurrent >= minPage && pageCurrent <= maxPage) {
      this.pagination = PaginationItem.createPageItem(pageCurrent, pageLargeStep, minPage, maxPage);
      this.scrollService.scrollToTop(false);
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
