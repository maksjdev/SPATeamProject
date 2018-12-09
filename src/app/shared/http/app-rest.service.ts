import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {AppHttpService} from '@shared/http/app-http.service';
import {catchError, map, retry} from 'rxjs/operators';
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

  public getData(ulr: string, data?: object): Observable<Object> {
    return this.connectService.getData(this.host + ulr);
  }
  private sendData(data: object, ulr: string): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.postData(this.host + ulr, data).pipe(
      map( (response: HttpResponse<ArrayBuffer>) => {
        console.log(response.body, response.headers);
        return response;
      })
    );
  }
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  // Отправка данных
  public onLogin(login: string, password: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.ON_LOGIN;
    return this.sendData({login: login, password: password }, url);
  }
  public onRegister(newUser: User, password: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.ON_LOGIN;
    return this.sendData({user: newUser, password: password}, url);
  }
  public sendNews(news: News): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.ADD_NEWS;
    return this.sendData(news, url);
  }
  public deleteNews(deleteID: string): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.DEL_NEWS;
    return this.sendData({id: deleteID}, url);
  }
  public sendCategory(category: Category): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.ADD_CATEGORY;
    return this.sendData(category, url);
  }

  // Получение данных
  public getNewsList(/*Параметры для фильтрации*/): Observable<Object> {
    let url = CONSTANTS.SERVER.GET_NEWS_LIST;
    return this.getData(url);
  }
  public getNewsData(id: string, type: string = 'full'): Observable<Object> {
    let url = CONSTANTS.SERVER.GET_NEWS;
    return this.getData(url, {id: id, type: type});
  }
  public getTopNews(): Observable<Object> {
    let url = CONSTANTS.SERVER.TOP_NEWS;
    return this.getData(url);
  }
  public getAllComments(newsID: string): Observable<Object> {
    let url = CONSTANTS.SERVER.GET_COMMENTS;
    return this.getData(url, {id: newsID});
  }
  public getAllCategories(): Observable<Object> {
    let url = CONSTANTS.SERVER.GET_ALL_CATEGORIES;
    return this.getData(url);
  }
  public getUserData(id: string): Observable<Object> {
    let url = CONSTANTS.SERVER.GET_USER;
    return this.getData(url);
  }
  public getConfigData(): Observable<Object> {
    let url = CONSTANTS.SERVER.CONFIG;
    return this.getData(url);
  }
}
