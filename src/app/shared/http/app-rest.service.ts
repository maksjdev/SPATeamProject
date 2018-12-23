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

  public restGetData(ulr: string, params?): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.getData(this.host + ulr, params);
  }
  private restSendData(ulr: string, data: object): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.postData(this.host + ulr, data);
  }
  private restDeleteData(ulr: string): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.deleteData(this.host + ulr);
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  // Отправка данных
  public restOnLogin(login: string, password: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.LOGIN;
    return this.restSendData(url, {login: login, password: password });
  }
  public restOnRegister(newUser: User, password: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.REGISTER;
    return this.restSendData(url,{
      email: newUser.getEmail(),
      realname: newUser.getRealName(),
      nickname: newUser.getNickname(),
      img_url: newUser.getImage(),
      password: password});
  }
  public restSendNews(news: News): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.NEWS;
    let categoriesId: string = news.getCategories().map((category: Category) => {
      return category.getId();
    }).join(',');
    console.log(categoriesId);
    return this.restSendData(url, {
      author: news.getAuthor().getId(),
      title: news.getTitle(),
      text: news.getText(),
      image_url: news.getImage(),
      categories: categoriesId
    });
  }
  public restSendCategory(category: Category): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.CATEGORY;
    return this.restSendData(url, {
      name: category.getName()
    });
  }

  // Удаление данных
  public restDeleteNews(deleteID: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.NEWS + '/' + deleteID;
    return this.restDeleteData(url);
  }
  public restDeleteCategory(deleteID: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.CATEGORY + '/' + deleteID;
    return this.restDeleteData(url);
  }

  // Получение данных
  public restGetNewsList(page?: string, period?: string, rating?: string, categoriesId?: string, search?: string): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS;
    let params = {
      "page": page, "period": period, "min_rating": rating, "categories_id": categoriesId, "search": search
    };
    return this.restGetData(url, params);
  }
  public restGetNewsData(newsId: string, type: string = 'full'): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS + '/' + newsId;
    return this.restGetData(url, { "type": type.toString()});
  }
  public restGetTopNews(amount?: string, type?: string): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS_TOP;
    amount = amount? amount : "";
    type = type? type : "";
    let params = { "amount": amount, "get_type": type };
    return this.restGetData(url, params);
  }

  public restGetAllComments(newsId: string): Observable<Object> {
    let url = CONSTANTS.SERVER.NEWS + '/' + newsId + CONSTANTS.SERVER.COMMENT;
    return this.restGetData(url);
  }
  public restGetAllCategories(amount?: string): Observable<Object> {
    let url = CONSTANTS.SERVER.CATEGORY;
    amount = amount? amount : "";
    let params = { "amount": amount };
    return this.restGetData(url, params);
  }
  public restGetUserData(userId: string): Observable<Object> {
    let url = CONSTANTS.SERVER.USER + '/' + userId;
    return this.restGetData(url);
  }
  public restGetConfigData(): Observable<Object> {
    let url = CONSTANTS.SERVER.CONFIG;
    return this.restGetData(url);
  }
}
