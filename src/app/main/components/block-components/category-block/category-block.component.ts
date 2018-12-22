import {Component, Input, OnInit} from '@angular/core';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {CONSTANTS} from '@shared/config/constants';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppScrollService} from '@shared/services/app-scroll.service';
import {ConfigService} from '@shared/config/config.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit {
  @Input() maxNumber: number;
  public categories: Array<Category>;
  public totalCount: number = 0;

  constructor(
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
    private scrollService: AppScrollService,
    private configService: ConfigService
  ){}

  ngOnInit() {
    if (!this.maxNumber || isNaN(this.maxNumber)){
      this.maxNumber = this.configService.getCategoryBlockMax();
    }
    this.loadCategory();
  }

  public loadCategory(){
    let amount = this.maxNumber;
    this.categoryService.getAllCategories().toPromise().then((value: Array<Category>) => {
      this.totalCount = value.length;
      this.categories = value.splice(0, amount);
    })
  }
  public deleteCategory(id: string){
    if (id) {
      this.categoryService.deleteCategody(id).then(value => {
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
