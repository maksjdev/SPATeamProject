import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {AppRestService} from '@shared/http/app-rest.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class NewsDataService {
  currentNews: Array<News>;

  constructor(
    private restService: AppRestService,
    private mockDataService: MockDataService
  ) {
    this.currentNews = [];
  }

  public sendNews(news: News): Observable<HttpResponse<ArrayBuffer>>{
    return this.restService.sendNews(news);
  }

  public getNewsFromServer(page: number, period: string, rating: string, categorys: Array<string>): Array<News> {
    let category: string = categorys.length > 0? categorys.join(',') : 'any';
    console.info(`Cервер - (стр. ${page}, период: ${period}, рейтинг: ${rating}), категории: ${category}!`);

    this.currentNews = this.mockDataService.getMockNewsList(5);
    // Сервер вернул, ок?
    return this.currentNews;
  }

  public getTopNews(): Array<News> {
    return this.mockDataService.getMockNewsList(5);
  }

  public getFullNewsData(id: string): News {
    return this.mockDataService.getMockNews();
  }
  public getMediumNewsData(id: string): News {
    return this.mockDataService.getMockNews();
  }
  public getSmallNewsData(id: string): News {
    return this.mockDataService.getMockNews();
  }

  public getComments(id: string){
    return this.mockDataService.getMockCommentList(5);
  }
}
