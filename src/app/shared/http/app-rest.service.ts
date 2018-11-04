import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {AppHttpService} from '@shared/http/app-http.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AppRestService {
  public host: string;

  constructor(private connectService: AppHttpService) {
    this.host = environment.host;
  }

  public getMockData(route: string){
    return this.connectService.getData(this.host + route).pipe(
      catchError(this.connectService.handleError('getSpecificData', []))
    );
  }

  public getAppConfigData() {
    return this.connectService.getData(this.host + 'config').pipe(
      catchError(this.connectService.handleError('getConfigData', []))
    );
  }

}
