import {Injectable} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';

@Injectable()
export class ConfigLoadService {
  static settings: any;

  constructor(private restApiService: AppRestService) {}

  loadAppConfig() {
    return new Promise<void>((resolve, reject) => {
      this.restApiService.getAppConfigData().toPromise().then((response : Array<any>) => {
        ConfigLoadService.settings = response;
        resolve();
      }).catch((response: any) => {
        console.error("Could not load file: app config file: ",response);
      });
    });
  }

}
