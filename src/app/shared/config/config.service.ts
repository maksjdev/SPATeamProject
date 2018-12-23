import {Injectable} from '@angular/core';
import {IConfigModel} from '@shared/models/IConfigModel';
import {ConfigLoadService} from '@shared/config/config-load.service';
import * as CONFIG_DEFAULT from '@shared/config/config-default.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigModel {
  categoryBlock_max: number;
  topBlock_max: number;

  defaultMinRating: number;
  defaultPeriod: string;
  defaultPage: number;

  constructor() {
    let serverConfig = ConfigLoadService.settings;
    let defaultConfig = CONFIG_DEFAULT;
    let config = serverConfig.hasOwnProperty('news')?  serverConfig : defaultConfig['default'];

    console.log(config);
    let news = config.news;
    this.defaultPage = news.page;
    this.defaultPeriod = news.period;
    this.defaultMinRating = news.rating;

    let category_block = config.category_block;
    this.categoryBlock_max = category_block.max;

    let top_block = config.top_block;
    this.topBlock_max = top_block.max;
  }

  getCategoryBlockMax(): number {
    return this.categoryBlock_max;
  }
  getDefaultPage(): number {
    return this.defaultPage;
  }
  getDefaultPeriod(): string {
    return this.defaultPeriod;
  }
  getDefaultRating(): number {
    return this.defaultMinRating;
  }
  getTopBlockMax(): number {
    return this.topBlock_max;
  }
}
