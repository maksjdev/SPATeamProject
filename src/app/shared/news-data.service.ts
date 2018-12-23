import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {AppRestService} from '@shared/http/app-rest.service';
import {Observable, of} from 'rxjs';
import {Comment} from '@shared/models/Comment';
import {catchError, map} from 'rxjs/operators';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {DtoService} from '@shared/dto.service';

@Injectable()
export class NewsDataService {

  constructor(
    private restService: AppRestService,
    private mockDataService: MockDataService,
    private dialogService: AppDialogService,
    private dtoService: DtoService
  ) {}

  public createNews(news: News): Promise<boolean>{
    return this.restService.restSendNews(news).pipe(
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
    return this.restService.restDeleteNews(id).pipe(
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

    return this.restService.restGetNewsList(page.toString(), period, rating, category, search).pipe(
      map((result: object) => {
        let newsArray: Array<News> = [];
        let filters = result['filters'],
            pagination = result['pagination'],
            news: Array<object> = result['news'];
        if (news && news.length > 0){
          news.forEach((newsObj: object) => {
            let news = this.dtoService.getNewsFromObj(newsObj);
            newsArray.push(news);
          })
        }
        return newsArray;
      })
    );
  }

  public getTopNews(amount?: number, type?: string): Observable<Array<News>> {
    return this.restService.restGetTopNews(amount+'', type).pipe(
      map((result: object) => {
        let newsArray: Array<News> = [];
        let total = result['amount_total'],
            send = result['amount_send'],
            news: Array<object> = result['news'];
        if (news && news.length > 0){
          news.forEach((newsObj: object) => {
            let news = this.dtoService.getNewsFromObj(newsObj);
            newsArray.push(news);
          })
        }
        return newsArray;
      })
    );
  }

  public getFullNewsData(id: string): Observable<News> {
    return this.getNewsData(id, 'full');
  }
  public getMediumNewsData(id: string): Observable<News> {
    return this.getNewsData(id, 'medium');
  }
  public getSmallNewsData(id: string): Observable<News> {
    return this.getNewsData(id, 'small');
  }
  private getNewsData(id: string, type: string): Observable<News> {
    if (!id) {return of(null)}
    return this.restService.restGetNewsData(id, type).pipe(
      map((newsObj: object) => {
        return this.dtoService.getNewsFromObj(newsObj);
      })
    );
  }

  public getComments(id: string): Observable<Array<Comment>> {
    // TODO Change for restService.restGetAllComments()
    return of(this.mockDataService.getMockCommentList(5));
  }
}
