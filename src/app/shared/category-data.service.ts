import {Injectable} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {MockDataService} from '@shared/mock-data.service';
import {Category} from '@shared/models/Category';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class CategoryDataService {

  constructor(
    private restService: AppRestService,
    private mockDataService: MockDataService
  ) { }

  public createCategory(category: Category): Observable<HttpResponse<ArrayBuffer>>{
    return this.restService.sendCategory(category);
  }

  public getAllCategories(): Observable<Array<Category>> {
    // TODO Change for restService.getAllCategories()
    return of(this.mockDataService.getMockCategories());
  }

  public getCategoryNames(arr: Array<Category>): Array<string> {
    let string: Array<string> = [];
    arr.forEach( (val, ind) => {
      string.push(val.name.toLowerCase());
    });
    return string;
  }
}
