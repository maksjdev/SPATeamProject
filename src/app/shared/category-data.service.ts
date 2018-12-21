import {Injectable} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {MockDataService} from '@shared/mock-data.service';
import {Category} from '@shared/models/Category';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
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

  public getAllCategories(amount?: number): Observable<Array<Category>> {
    return this.restService.getAllCategories(amount).pipe(
      map((response: object) => {
        let resultArr: Array<Category> = [];
        let totalCount: number = 0;
        if (response || response.hasOwnProperty('categories')) {
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

  public getCategoryNames(arr: Array<Category>): Array<string> {
    let string: Array<string> = [];
    arr.forEach( (val, ind) => {
      string.push(val.name.toLowerCase());
    });
    return string;
  }
}
