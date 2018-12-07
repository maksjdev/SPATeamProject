import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {AppHttpService} from '@shared/http/app-http.service';
import {catchError, map, retry} from 'rxjs/operators';
import {News} from '@shared/models/News';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONSTANTS} from '@shared/config/constants';
import {Category} from '@shared/models/Category';

@Injectable()
export class AppRestService {
  public host: string;

  constructor(
    private connectService: AppHttpService
  ) {
    this.host = environment.host;
  }

  private getData(ulr: string): Observable<Object> {
    return this.connectService.getData(this.host + ulr);
  }
  private sendData(data: any, ulr: string): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.postData(this.host + ulr, data).pipe(
      map( (response: HttpResponse<ArrayBuffer>) => {
        console.log(response.body, response.headers);
        return response;
      })
    );
  }


  public sendNews(news: News): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.ADD_NEWS;
    return this.sendData(news, url);
  }
  public sendCategory(category: Category): Observable<HttpResponse<ArrayBuffer>> {
    let url = CONSTANTS.SERVER.ADD_CATEGORY;
    return this.sendData(category, url);
  }


  public getUserData(id: string): Observable<Object>{
    let url = CONSTANTS.SERVER.GET_USER;
    return this.getData(url).pipe(
      retry(1),
      catchError(this.connectService.handleError(`getUserData #${id}`, []))
    );
  }
  public getAppConfigData(): Observable<Object>{
    let url = CONSTANTS.SERVER.CONFIG;
    return this.getData(url).pipe(
      retry(1),
      catchError(this.connectService.handleError('getConfigData', []))
    );
  }
}
