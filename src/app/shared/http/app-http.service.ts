import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class AppHttpService {

  constructor(private httpClient: HttpClient){}

  public getData(url: string){
    return this.httpClient.get(url);
  }

  public putData(url: string, data, options){
    return this.httpClient.put(url, data, options);
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
