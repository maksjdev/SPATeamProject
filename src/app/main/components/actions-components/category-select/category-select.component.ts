import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {Category} from '@shared/models/Category';
import {CategoryDataService} from '@shared/category-data.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnChanges {
  @Input() categorys: Array<Category>;
  @Input() selectedCategory: Array<Category>;

  @Output() categoryAdd = new EventEmitter();
  @Output() categoryRemove = new EventEmitter();
  @Output() categoryClear = new EventEmitter();
  paramName: string;

  constructor(
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService
  ) {
    this.paramName = CONSTANTS.QUERY.CATEGORY;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('selectedCategory') && changes['selectedCategory'].currentValue) {
      if (this.selectedCategory.length > 0) {
        setTimeout(_ => {
          let param = {[this.paramName]: this.categoryService.getCategoryNames(this.selectedCategory).join(',')};
          this.routingService.setQueryParam(param);
        }, 20);
      } else {
        let param = {[this.paramName]: null};
        this.routingService.setQueryParam(param);
      }
    }
  }

  OnAddItem(value){
    this.categoryAdd.emit(value);
  }
  OnRemoveItem(value){
    this.categoryRemove.emit(value);
  }
  OnClearAll(value){
    this.categoryClear.emit(value);
  }
}
