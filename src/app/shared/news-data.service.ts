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

  public createNews(news: News): Observable<HttpResponse<ArrayBuffer>>{
    return this.restService.sendNews(news);
  }
  public deleteNews(id: string): Observable<HttpResponse<ArrayBuffer>>{
    return this.restService.deleteNews(id);
  }

  public getNewsFromServer(
    page: number, period?: string, rating?: string, categoriesId?: Array<string>, search?: string
  ): Observable<Array<News>> {
    //let category: string = categories.length > 0 ? categories.join(',');
    console.info(`Нужно - (стр. ${page}, период: ${period}, рейтинг: ${rating}, категории: ${categoriesId}, поиск: ${search || 'нету'})!`);

    // TODO Change for restService.getNewsList()
    let currentNews: Observable<Array<News>> = of(this.mockDataService.getMockNewsList(5));
    return currentNews;
  }

  public getTopNews(amount?: number): Observable<Array<News>> {
    // TODO Change for restService.getTopNews()
    return of(this.mockDataService.getMockNewsList(5));
  }

  public getFullNewsData(id: string): Observable<News> {
    // TODO Change for restService.getNewsData('full')
    return id? of(this.mockDataService.getMockNews()) : of(null);
  }
  public getMediumNewsData(id: string): Observable<News> {
    // TODO Change for restService.getNewsData('medium')
    return of(this.mockDataService.getMockNews());
  }
  public getSmallNewsData(id: string): Observable<News> {
    // TODO Change for restService.getNewsData('small')
    return of(this.mockDataService.getMockNews());
  }

  public getComments(id: string): Observable<Array<Comment>> {
    // TODO Change for restService.getAllComments()
    return of(this.mockDataService.getMockCommentList(5));
  }
}
