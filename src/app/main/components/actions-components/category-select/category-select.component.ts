import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {
  categorys: object;
  selectedCategody: object;

  constructor() {
    this.categorys = [
      { id: '1', name: 'Anime', disabled: true },
      { id: '2', name: 'Web', disabled: false },
      { id: '3', name: 'Design', disabled: false },
      { id: '3', name: 'Android', disabled: false },
      { id: '3', name: 'Toasters', disabled: false },
      { id: '3', name: 'iOS', disabled: false },
      { id: '3', name: 'Space', disabled: false },
      { id: '3', name: 'Navalny', disabled: false },
    ];
  }

  ngOnInit() {
  }

}
