import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {CONSTANTS} from '@shared/config/constants';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppScrollService} from '@shared/services/app-scroll.service';
import {ConfigService} from '@shared/config/config.service';
import {Subscription} from 'rxjs';
import {AppDialogService} from '@shared/services/app-dialog.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit, OnDestroy {
  @Input() maxNumber: number;
  public categories: Array<Category>;
  public totalCount: number = 0;
  public _subs: Subscription;

  constructor(
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
    private dialogService: AppDialogService,
    private scrollService: AppScrollService,
    private configService: ConfigService
  ){}

  ngOnInit() {
    if (!this.maxNumber || isNaN(this.maxNumber)){
      this.maxNumber = this.configService.getCategoryBlockMax();
    }
    this._subs = this.categoryService.getCurrentCategoriesData().subscribe((value: Array<Category>) => {
      if (!value) return;
      this.totalCount = value.length;
      this.categories = [...value].splice(0, this.maxNumber);
    })
  }
  ngOnDestroy(): void {
    if (this._subs) this._subs.unsubscribe();
  }

  public loadCategory(){
    this.categoryService.reloadCurrentCategoriesData();
  }

  public deleteCategory(id: string){
    if (id) {
      this.categoryService.deleteCategody(id).then((success: boolean) => {
        if (!success) { return; }
        this.dialogService.showToastSuccess(CONSTANTS.MSG.CATEGORY_DEL);
        this.loadCategory();
      })
    }
  }

  public goToMainWithCategory(category: Category): void {
    let queryParam = {[CONSTANTS.QUERY.CATEGORY]: category.name.toLowerCase()};
    this.routingService.goToLinkWithQuery(CONSTANTS.APP.MAIN, false, queryParam, true);
    this.scrollService.scrollToTop();
  }
}
