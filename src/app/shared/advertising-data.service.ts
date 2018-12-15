import { Injectable } from '@angular/core';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';

@Injectable()
export class AdvertisingDataService {
  advList: Array<Advertising>;

  constructor() {
    let adv1: Advertising = new Advertising('771','Burger King #1',
      'https://burgerking.ru/images/actions/BK-2115_HALLOWEEN-WHOPPER_710x459px.jpg',
      'https://burgerking.ru/actions');
    let adv2: Advertising = new Advertising('772','Burger King #2',
      'https://burgerking.ru/images/actions/BK-2037_CHEESY_710х459_.jpg',
      'https://burgerking.ru/actions');
    let adv3: Advertising = new Advertising('773','Burger King #3',
      'https://burgerking.ru/images/actions/BK-0883_KUPONY14_710x459px.jpg',
      'https://burgerking.ru/actions');
    let adv4: Advertising = new Advertising('774','Burger King #4',
      'https://burgerking.ru/images/actions/IMG_3605.jpg',
      'https://burgerking.ru/actions', true);
    let adv5: Advertising = new Advertising('775','Burger King #5',
      'https://burgerking.ru/images/actions/BK-2212_6-ZA-199-90_710x459px.jpg',
      'https://burgerking.ru/actions', true);
    let adv6: Advertising = new Advertising('776','Burger King#6',
      'https://burgerking.ru/images/actions/BK-0729_REFILL_710x459px_.jpg',
      'https://burgerking.ru/actions');
    this.advList = [adv1, adv2, adv3, adv4, adv5, adv6];
  }

  public getRandomAdv(): Advertising {
    let length = this.advList.length;
    return this.advList[Math.floor(Math.random()*length)];
  }
}
