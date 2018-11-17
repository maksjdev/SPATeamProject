import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {Category} from '@shared/models/Category';

@Injectable()
export class NewsDataService {
  currentNews: Array<News>;

  constructor(
    private mockDataService: MockDataService
  ) {
    this.currentNews = [];
  }

  public getNewsFromServer(page: number, period: string, rating: string, categorys: Array<string>): Array<News> {
    let category: string = categorys.length > 0? categorys.join(',') : 'any';
    console.info(`Cервер - (стр. ${page}, период: ${period}, рейтинг: ${rating}), категории: ${category}!`);

    this.currentNews = this.mockDataService.getMockNewsList(5);
    // Сервер вернул, ок?
    return this.currentNews;
  }
  public getFullNews(id: string): News {
    return this.mockDataService.getMockNews();
  }
  public getTopNews(): Array<News> {
    return this.mockDataService.getMockNewsList(5);
  }

  public getCategories(): Array<Category>{
    return this.mockDataService.getMockCategories();
  }

  public getCategoryNames(arr: Array<Category>): Array<string> {
    let string: Array<string> = [];
    arr.forEach( (val, ind) => {
      string.push(val.name.toLowerCase());
    });
    return string;
  }
}
