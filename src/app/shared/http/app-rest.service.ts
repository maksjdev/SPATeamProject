import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {AppHttpService} from '@shared/http/app-http.service';
import {News} from '@shared/models/News';
import {HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CONSTANTS} from '@shared/config/constants';
import {Category} from '@shared/models/Category';
import {User} from '@shared/models/User';

@Injectable()
export class AppRestService {
  public host: string;

  constructor(
    private connectService: AppHttpService
  ) {
    this.host = environment.host;
  }

  public getData(ulr: string, params?): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.getData(this.host + ulr, params);
  }
  private sendData(ulr: string, data: object): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.postData(this.host + ulr, data);
  }
  private deleteData(ulr: string): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.deleteData(this.host + ulr);
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  // Отправка данных
  public onLogin(login: string, password: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.LOGIN;
    return this.sendData(url, {login: login, password: password });
  }
  public onRegister(newUser: User, password: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.REGISTER;
    return this.sendData(url,{
      email: newUser.getEmail(),
      realname: newUser.getRealName(),
      nickname: newUser.getNickname(),
      img_url: newUser.getImage(),
      password: password});
  }
  public sendNews(news: News): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.NEWS;
    let categoriesId: string = news.getCategories().map((category: Category) => {
      return category.getId();
    }).join(',');
    console.log(categoriesId);
    return this.sendData(url, {
      author: news.getAuthor().getId(),
      title: news.getTitle(),
      text: news.getText(),
      image_url: news.getImage(),
      categories: categoriesId
    });
  }
  public sendCategory(category: Category): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.CATEGORY;
    return this.sendData(url, {
      name: category.getName()
    });
  }

  // Удаление данных
  public deleteNews(deleteID: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.NEWS + '/' + deleteID;
    return this.deleteData(url);
  }
  public deleteCategory(deleteID: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.CATEGORY + '/' + deleteID;
    return this.deleteData(url);
  }

  // Получение данных
  public getNewsList(page?: string, period?: string, rating?: string, categoriesId?: string, search?: string): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS;
    let params = {
      "page": page, "period": period, "min_rating": rating, "categories_id": categoriesId, "search": search
    };
    return this.getData(url, params);
  }
  public getNewsData(newsId: string, type: string = 'full'): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS + '/' + newsId;
    return this.getData(url, { "type": type.toString()});
  }
  public getTopNews(amount?: number): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS_TOP;
    let params = amount? { "amount": amount.toString() } : {};
    return this.getData(url, params);
  }

  public getAllComments(newsId: string): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS + '/' + newsId + CONSTANTS.SERVER.COMMENT;
    return this.getData(url);
  }
  public getAllCategories(amount?: number): Observable<Object> {
    let url = CONSTANTS.SERVER.CATEGORY;
    let params = amount? { "amount": amount.toString() } : {};
    return this.getData(url, params);
  }
  public getUserData(userId: string): Observable<Object> {
    let url = CONSTANTS.SERVER.USER + '/' + userId;
    return this.getData(url);
  }
  public getConfigData(): Observable<Object> {
    let url = CONSTANTS.SERVER.CONFIG;
    return this.getData(url);
  }
}
