import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {AppHttpService} from '@shared/http/app-http.service';
import {catchError, map, retry} from 'rxjs/operators';
import {News} from '@shared/models/News';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AppRestService {
  public host: string;

  constructor(
    private connectService: AppHttpService
  ) {
    this.host = environment.host;
  }

  sendNews(news: News): Observable<HttpResponse<ArrayBuffer>> {
    return this.connectService.postData(this.host+'add-news', news).pipe(
      map( (response: HttpResponse<ArrayBuffer>) => {
        // Ответ сервера
        console.log(response.body, response.headers);
        return response;
      })
    );
  }

  public getMockData(route: string) {
    return this.connectService.getData(this.host + route).pipe(
      catchError(this.connectService.handleError('getSpecificData', []))
    );
  }

  public getAppConfigData() {
    return this.connectService.getData(this.host + 'config').pipe(
      retry(3),
      catchError(this.connectService.handleError('getConfigData', []))
    );
  }

}
