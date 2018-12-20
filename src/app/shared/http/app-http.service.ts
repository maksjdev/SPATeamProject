import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AppHttpService {

  constructor(
    private httpClient: HttpClient
  ){}

  // DEFAULT CRUD MODEL (CREATE, READ, UPDATE, DELETE
  public postData(url: string, data: object, params?): Observable<any> {
    let myParams = new HttpParams(params);
    let myHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    let options = {
      headers: myHeaders,
      params: myParams
    };
    let body = JSON.stringify(data);
    return this.httpClient.post(url, body, options);
  }

  public getData(url: string, params?): Observable<any> {
    let myParams = new HttpParams(params);
    let options = {
      params: myParams
    };
    return this.httpClient.get(url, options);
  }

  public updateData(url: string, data, options?): Observable<any> {
    return this.httpClient.patch(url, data);
  }

  public deleteData(url: string, data): Observable<any>  {
    return this.httpClient.delete(url);
  }
}
