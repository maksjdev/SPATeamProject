import {Injectable} from '@angular/core';
import {IConfigModel} from '@shared/models/IConfigModel';
import {ConfigLoadService} from '@shared/config/config-load.service';
import {AppConfigDefault} from '@shared/config/config-default';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigModel{
  numbOfNews: number;

  constructor() {
    let serverConfig = ConfigLoadService.settings;
    let config = serverConfig.hasOwnProperty('news')?  serverConfig : AppConfigDefault;
    this.numbOfNews = config.news.numbers.start;
  }

  getNumberOfNews(): number {
    return this.numbOfNews;
  }
}
