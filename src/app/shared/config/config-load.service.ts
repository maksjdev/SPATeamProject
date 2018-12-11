import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';

@Injectable()
export class ConfigLoadService {
  static settings: any;

  constructor(
    private restService: AppRestService,
  ) {}

  loadAppConfig() {
    return new Promise<void>((resolve, reject) => {
      this.getConfig().toPromise().then((response : Array<any>) => {
        ConfigLoadService.settings = response;
        resolve();
      }).catch((response: any) => {
        console.error("Could not load file: app config file: ",response);
      });
    });
  }

  public getConfig(): Observable<Object>{
    return this.restService.getConfigData().pipe(
      catchError(this.restService.handleError('getConfigData', []))
    );
  }
}
