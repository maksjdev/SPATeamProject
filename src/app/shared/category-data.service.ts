import {Injectable} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {Category} from '@shared/models/Category';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppDialogService} from '@shared/services/app-dialog.service';

@Injectable()
export class CategoryDataService {

  constructor(
    private restService: AppRestService,
    private dialogService: AppDialogService,
  ) { }

  public createCategory(category: Category): Promise<boolean>{
    return this.restService.sendCategory(category).pipe(
      catchError((errorMsg: string) => {
        // Создание НЕ удалось
        this.dialogService.showDialog(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      // Если ошибка то тут будет не object, а строка ошибки которую обработал интерсептор
      return value === Object(value);
    })
  }

  public deleteCategody(id: string): Promise<boolean>{
    return this.restService.deleteCategory(id).pipe(
      catchError((errorMsg: string) => {
        // Создание НЕ удалось
        this.dialogService.showDialog(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      return value === Object(value);
    })
  }

  public getAllCategories(amount?: number): Observable<Array<Category>> {
    return this.restService.getAllCategories(amount).pipe(
      catchError((errorMsg: string) => {
        // Получение НЕ удалось
        return of(errorMsg);
      }),
      map((response: object) => {
        let resultArr: Array<Category> = [];
        let totalCount: number = 0;
        if (response && response.hasOwnProperty('categories')) {
          totalCount = response['amount_total'];
          response['categories'].forEach( (c: object, index) => {
            let id = c['_id'], name = c['name'], newsList = c['news_list'],
                amount = c['news_amount'], disabled = c['disabled'];
            let category = new Category(id, name, amount, newsList, disabled);
            resultArr.push(category);
          });
        }
        return resultArr;
      })
    );
  }

  public getCategoryBy(arr: Array<Category>, fieldName: string): Array<string> {
    let string: Array<string> = [];
    arr.forEach( (val, ind) => {
      string.push(val[fieldName].toLowerCase());
    });
    return string;
  }
}
