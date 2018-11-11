import {Component, OnInit, OnDestroy, ViewRef} from '@angular/core';
import {removeChild} from '@angular/core/src/render3/node_manipulation';

@Component({
  selector: 'app-ad-item-block',
  templateUrl: './ad-item-block.component.html',
  styleUrls: ['./ad-item-block.component.scss']
})
  export class AdItemBlockComponent {
  adversiting: object;

  constructor() {
    this.adversiting = {
      title: 'Burger King',
      link: 'https://burgerking.ru/images/actions/BK-2037_CHEESY_710х459_.jpg',
      href: 'https://burgerking.ru/actions'
    }
  }
  public OnClose(event): void {
    let x;
    for(x in this.adversiting) {
      delete this.adversiting[x];
    }

  }

}
