import { Component, OnInit, Input} from '@angular/core';
import { CategorySelectComponent } from '@components/actions-components/category-select/category-select.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  @Input() categorys: object;

  constructor() { }

  ngOnInit() {
  }

}
