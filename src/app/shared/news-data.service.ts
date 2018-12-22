import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {AppRestService} from '@shared/http/app-rest.service';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Comment} from '@shared/models/Comment';
import {catchError, map} from 'rxjs/operators';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {Category} from '@shared/models/Category';
import {User} from '@shared/models/User';

@Injectable()
export class NewsDataService {

  constructor(
    private restService: AppRestService,
    private mockDataService: MockDataService,
    private dialogService: AppDialogService
  ) {}

  public createNews(news: News): Promise<boolean>{
    return this.restService.sendNews(news).pipe(
      catchError((errorMsg: string) => {
        // Создание НЕ удалось
        this.dialogService.showDialog(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      // Если ошибка то тут будет не object, а строка ошибки которую обработал интерсептор
      return value === Object(value);
    });
  }
  public deleteNews(id: string): Promise<boolean>{
    return this.restService.deleteNews(id).pipe(
      catchError((errorMsg: string) => {
        // Создание НЕ удалось
        this.dialogService.showDialog(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      // Если ошибка то тут будет не object, а строка ошибки которую обработал интерсептор
      return value === Object(value);
    });
  }

  public getNewsFromServer(
    page: number, period?: string, rating?: string, categoriesId?: Array<string>, search?: string
  ): Observable<Array<News>> {
    let category: string = categoriesId.length > 0 ? categoriesId.join(',') : null;

    return this.restService.getNewsList(page.toString(), period, rating, category, search).pipe(
      map((result: object) => {
        let newsArray: Array<News> = [];
        let filters = result['filters'], pagination = result['pagination'],
            news: Array<object> = result['news'];
        if (news && news.length > 0){
          news.forEach((newsObj, index) => {
            let id = newsObj['_id'];
            let authorObj: object = newsObj['author'];
            let author: User = new User(authorObj['_id'], authorObj['realname'], authorObj['nickname'],
              authorObj['email'], authorObj['img_url'], authorObj['rating'], authorObj['role']);

            let categoriesObj: Array<object> = newsObj['categories'];
            let categories = categoriesObj.map(categoryObj => {
              let category = new Category(categoryObj['_id'], categoryObj['name'], categoryObj['news_amount']);
              return category;
            });
            let date = new Date(newsObj['create_date']);
            let title = newsObj['title'];
            let text = newsObj['text'];
            let image = newsObj['img_url'];
            let rating = newsObj['rating'];
            let news: News = new News(id, author, date, title, text, image, categories, rating);
            newsArray.push(news);
          })
        }
        return newsArray;
      })
    );
  }

  public getTopNews(amount?: number): Observable<Array<News>> {
    // TODO Change for restService.getTopNews()
    return of(this.mockDataService.getMockNewsList(5));
  }

  public getFullNewsData(id: string): Observable<News> {
    // TODO Change for restService.getNewsData('full')
    return id? of(this.mockDataService.getMockNews()) : of(null);
  }
  public getMediumNewsData(id: string): Observable<News> {
    // TODO Change for restService.getNewsData('medium')
    return of(this.mockDataService.getMockNews());
  }
  public getSmallNewsData(id: string): Observable<News> {
    // TODO Change for restService.getNewsData('small')
    return of(this.mockDataService.getMockNews());
  }

  public getComments(id: string): Observable<Array<Comment>> {
    // TODO Change for restService.getAllComments()
    return of(this.mockDataService.getMockCommentList(5));
  }
}
