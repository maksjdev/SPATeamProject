import {Injectable} from '@angular/core';
import {IConfigModel} from '@shared/models/IConfigModel';
import {ConfigLoadService} from '@shared/config/config-load.service';
import * as CONFIG_DEFAULT from '@shared/config/config-default.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigModel {
  numbOfNews: number;

  constructor() {
    let serverConfig = ConfigLoadService.settings;
    let defaultConfig = CONFIG_DEFAULT;
    let config = serverConfig.hasOwnProperty('news')?  serverConfig : defaultConfig['default'];

    console.log(config);
    let news = config.news;
    this.numbOfNews = news.numbers;
  }

  getNumberOfNews(): number {
    return this.numbOfNews;
  }
}
