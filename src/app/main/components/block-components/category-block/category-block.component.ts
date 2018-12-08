import { Component, OnInit } from '@angular/core';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {Subscription} from 'rxjs';
import {CONSTANTS} from '@shared/config/constants';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppScrollService} from '@shared/services/app-scroll.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit {
  public categories: Array<Category>;
  private _subscription: Subscription;


  constructor(
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
    private scrollService: AppScrollService,
  ){}

  ngOnInit() {
    this._subscription = this.categoryService.getAllCategories().subscribe((value: Array<Category>) => {
      this.categories  = value;
    });
  }
  public goToMainWithCategory(category: Category): void {
      let queryParam = {[CONSTANTS.QUERY.CATEGORY]: category.name.toLowerCase()};
      this.routingService.goToLinkWithQuery(CONSTANTS.APP.MAIN, false, queryParam);
      this.scrollService.scrollToTop();
  }
}
