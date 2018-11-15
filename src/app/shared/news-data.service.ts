import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';

@Injectable()
export class NewsDataService {
  currentNews: Array<News>;

  constructor(
    private mockDataService: MockDataService
  ) {
    this.currentNews = [];
  }

  public getNewsFromServer(page: number, period: string, rating: string): Array<News> {
    console.info(`Cервер - (стр. ${page}, период: ${period}, рейтинг: ${rating})!`);
    this.currentNews = this.mockDataService.getMockNewsList(5);
    // Сервер вернул, ок?
    return this.currentNews;
  }

  public getTopNews (): Array<News> {
    return this.mockDataService.getMockNewsList(5);
  }
}
