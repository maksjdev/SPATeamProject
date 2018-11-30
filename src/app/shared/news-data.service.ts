import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {Category} from '@shared/models/Category';
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
  public getFullNews(id: string): News {
    return this.mockDataService.getMockNews();
  }
  public getTopNews(): Array<News> {
    return this.mockDataService.getMockNewsList(5);
  }

  public getFullNewsData(): News {
    // Ладно, потом
    return this.mockDataService.getMockNews();
  }
  public getMediumNewsData(): News {
    return this.mockDataService.getMockNews();
  }
  public getSmallNewsData(): News {
    return this.mockDataService.getMockNews();
  }

  public getComments(number){
    return this.mockDataService.getMockCommentList(number);
  }

  public getCategories(): Array<Category>{
    return this.mockDataService.getMockCategories();
  }

  public getCategoryNames(arr: Array<Category>): Array<string> {
    let string: Array<string> = [];
    arr.forEach( (val, ind) => {
      string.push(val.name.toLowerCase());
    });
    return string;
  }
}
