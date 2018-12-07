import { Component, OnInit } from '@angular/core';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit {
  public categories: Array<Category>;
  private _subscription: Subscription;


  constructor(
    private categoryService: CategoryDataService
  ) {
  }

  ngOnInit() {
    this._subscription = this.categoryService.getAllCategories().subscribe((value: Array<Category>) => {
      this.categories  = value;
    });
  }
}
