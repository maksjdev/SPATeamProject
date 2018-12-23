import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AppHttpService {

  constructor(
    private httpClient: HttpClient
  ){}

  // DEFAULT CRUD MODEL (CREATE, READ, UPDATE, DELETE
  public postData(url: string, data: object): Observable<any> {
    let myHeaders = new HttpHeaders({
      "Content-Type": "application/json; charset=UTF-8",
    });
    let options = { headers: myHeaders };
    let body = JSON.stringify(data);
    return this.httpClient.post(url, body, options);
  }

  public updateData(url: string, data: object): Observable<any> {
    let myHeaders = new HttpHeaders({
      "Content-Type": "application/json; charset=UTF-8",
    });
    let options = { headers: myHeaders };
    let body = JSON.stringify(data);
    return this.httpClient.patch(url, body, options);
  }

  public getData(url: string, params?: HttpParams): Observable<any> {
    let options = {
      params: params
    };
    return this.httpClient.get(url, options);
  }

  public deleteData(url: string): Observable<any>  {
    return this.httpClient.delete(url);
  }
}
