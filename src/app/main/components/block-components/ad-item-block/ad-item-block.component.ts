import {Component, Input} from '@angular/core';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';

@Component({
  selector: 'app-ad-item-block',
  templateUrl: './ad-item-block.component.html',
  styleUrls: ['./ad-item-block.component.scss']
})
  export class AdItemBlockComponent {
  isClosed: boolean = false;
  @Input() advertising: Advertising;

  constructor() {}

  public OnClose(event): void {
    this.isClosed = true;
  }
}
