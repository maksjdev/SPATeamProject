import { Component, OnInit } from '@angular/core';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit {
  categorys: Array<Category>;

  constructor(
    private categoryService: CategoryDataService
  ) {
    this.categorys = this.categoryService.getAllCategories();
  }

  ngOnInit() {
  }

}
