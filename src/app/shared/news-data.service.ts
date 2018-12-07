import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {AppRestService} from '@shared/http/app-rest.service';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Comment} from '@shared/models/Comment';

@Injectable()
export class NewsDataService {

  constructor(
    private restService: AppRestService,
    private mockDataService: MockDataService
  ) {}

  public sendNews(news: News): Observable<HttpResponse<ArrayBuffer>>{
    return this.restService.sendNews(news);
  }

  public getNewsFromServer(
    page: number, period: string, rating: string,
    categories: Array<string>, search?: string
  ): Observable<Array<News>> {
    let category: string = categories.length > 0 ? categories.join(',') : 'any';
    console.info(`Нужно - (стр. ${page}, период: ${period}, рейтинг: ${rating}),категории: ${category}, поиск: ${search || 'нету'} !`);

    let currentNews: Observable<Array<News>> = of(this.mockDataService.getMockNewsList(5));
    return currentNews;
  }

  public getTopNews(): Observable<Array<News>> {
    return of(this.mockDataService.getMockNewsList(5));
  }

  public getFullNewsData(id: string): Observable<News> {
    return of(this.mockDataService.getMockNews());
  }
  public getMediumNewsData(id: string): Observable<News> {
    return of(this.mockDataService.getMockNews());
  }
  public getSmallNewsData(id: string): Observable<News> {
    return of(this.mockDataService.getMockNews());
  }

  public getComments(id: string): Observable<Array<Comment>>{
    return of(this.mockDataService.getMockCommentList(5));
  }
}
