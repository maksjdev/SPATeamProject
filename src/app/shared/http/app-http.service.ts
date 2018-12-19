import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class AppHttpService {

  constructor(
    private httpClient: HttpClient
  ){}

  // DEFAULT CRUD MODEL (CREATE, READ, UPDATE, DELETE
  public postData<T>(url: string, body, options?): Observable<Object> {
    // В опциях как раз и будут все вспомогательные данные
    let myHeaders = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    return this.httpClient.post(url, body, {headers: myHeaders});
  }
  public getData(url: string, data?): Observable<Object> {
    return this.httpClient.get(url);
  }
  public updateData(url: string, data, options?): Observable<Object> {
    return this.httpClient.patch(url, data);
  }
  public deleteData(url: string, data): Observable<Object>  {
    return this.httpClient.delete(url);
  }
}
