import {Component, Input, OnInit} from '@angular/core';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {CONSTANTS} from '@shared/config/constants';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppScrollService} from '@shared/services/app-scroll.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit {
  @Input() manNumber: number = 8;
  public categories: Array<Category>;
  public totalCount: number;

  constructor(
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
    private scrollService: AppScrollService,
  ){}

  ngOnInit() {
    this.loadCategory();
  }

  public loadCategory(){
    let amount = this.manNumber;
    this.categoryService.getAllCategories().toPromise().then((value: Array<Category>) => {
      this.totalCount = value.length;
      this.categories = value.splice(0, amount);
    })
  }
  public goToMainWithCategory(category: Category): void {
    let queryParam = {[CONSTANTS.QUERY.CATEGORY]: category.name.toLowerCase()};
    this.routingService.goToLinkWithQuery(CONSTANTS.APP.MAIN, false, queryParam, true);
    this.scrollService.scrollToTop();
  }
}
