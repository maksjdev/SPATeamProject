import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-category-item',
  templateUrl: './list-category-item.component.html',
  styleUrls: ['./list-category-item.component.scss']
})
export class ListCategoryItemComponent implements OnInit {
  @Input() item: object;

  constructor() {

  }

  ngOnInit() {
  }

}
