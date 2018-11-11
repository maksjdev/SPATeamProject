import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-item-block',
  templateUrl: './category-item-block.component.html',
  styleUrls: ['./category-item-block.component.scss']
})
export class CategoryItemBlockComponent implements OnInit {
  categorys: object;

  constructor() {
    this.categorys = [
      { id: '1', name: 'Anime', amount: '+5', disabled: true },
      { id: '2', name: 'Web', amount: '+5', disabled: false },
      { id: '3', name: 'Design', amount: '+5', disabled: false },
      { id: '3', name: 'Android', amount: '+5', disabled: false },
      { id: '3', name: 'Toasters', amount: '+5', disabled: false },
      { id: '3', name: 'iOS', amount: '+5', disabled: false },
      { id: '3', name: 'Space', amount: '+5', disabled: false },
      { id: '3', name: 'Navalny', amount: '+5', disabled: false },
    ];
  }

  ngOnInit() {
  }

}
