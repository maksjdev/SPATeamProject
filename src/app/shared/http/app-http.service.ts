import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class AppHttpService {

  constructor(
    private httpClient: HttpClient
  ){}

  public getData(url: string): Observable<Object> {
    return this.httpClient.get(url);
  }

  public postData<T>(url: string, data, options?): Observable<Object> {
    // В опциях как раз и будут все вспомогательные данные
    let body = JSON.stringify(data);
    let myHeaders = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('responseType', 'text')
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    return this.httpClient.post(url, body, {headers: myHeaders});
  }

}
