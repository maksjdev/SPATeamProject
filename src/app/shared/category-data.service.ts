import {Injectable} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {Category} from '@shared/models/Category';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {DtoService} from '@shared/dto.service';

@Injectable()
export class CategoryDataService {
  private currentCategories: BehaviorSubject<Array<Category>>;

  constructor(
    private restService: AppRestService,
    private dialogService: AppDialogService,
    private dtoService: DtoService
  ) {
    this.currentCategories = new BehaviorSubject(null);
  }

  public reloadCurrentCategoriesData(): void {
    this.getCurrentCategoriesData(true);
  }
  public getCurrentCategoriesData(forceReload: boolean = true): BehaviorSubject<Array<Category>> {
    let currentV = this.currentCategories.getValue();
    if (!currentV || (currentV && currentV.length < 1) || forceReload){
      this.getAllCategories().toPromise().then ( (categories: Array<Category>) => {
        this.currentCategories.next(categories);
      })
    } return this.currentCategories;
  }

  public createCategory(category: Category): Promise<boolean>{
    return this.restService.restSendCategory(category).pipe(
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
    return this.restService.restDeleteCategory(id).pipe(
      catchError((errorMsg: string) => {
        // Создание НЕ удалось
        this.dialogService.showDialog(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      return value === Object(value);
    })
  }

  public getAllCategories(amount?: string): Observable<Array<Category>> {
    return this.restService.restGetAllCategories(amount).pipe(
      catchError((errorMsg: string) => {
        // Получение НЕ удалось
        this.dialogService.showDialog(errorMsg);
        return of(errorMsg);
      }),
      map((response: object) => {
        let resultArr: Array<Category> = [];
        let totalCount: number = 0;
        if (response && response.hasOwnProperty('categories')) {
          totalCount = response['amount_total'];
          response['categories'].forEach( (obj: object) => {
            let category = this.dtoService.getCategoryFromObj(obj);
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
