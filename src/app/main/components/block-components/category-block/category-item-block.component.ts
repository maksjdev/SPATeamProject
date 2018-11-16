import { Component, OnInit } from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';

@Component({
  selector: 'app-category-item-block',
  templateUrl: './category-item-block.component.html',
  styleUrls: ['./category-item-block.component.scss']
})
export class CategoryItemBlockComponent implements OnInit {
  categorys: object;

  constructor(
    private newsService: NewsDataService
  ) {
    this.categorys = this.newsService.getCategories();
  }

  ngOnInit() {
  }

}
