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
      { id: '1', name: 'Anime', amount: '+15', disabled: true },
      { id: '2', name: 'Web', amount: '+25', disabled: false },
      { id: '3', name: 'Design', amount: '+5', disabled: false },
      { id: '3', name: 'Android', amount: '+35', disabled: false },
      { id: '3', name: 'Toasters', amount: '+15', disabled: false },
      { id: '3', name: 'iOS', amount: '+25', disabled: false },
      { id: '3', name: 'Space', amount: '+20', disabled: false },
      { id: '3', name: 'Navalny', amount: '+12', disabled: false },
    ];
  }

  ngOnInit() {
  }

}
