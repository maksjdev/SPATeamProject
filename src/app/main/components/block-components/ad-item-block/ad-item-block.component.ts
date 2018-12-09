import {Component, Input} from '@angular/core';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';
import {AdvertisingDataService} from '@shared/advertising-data.service';

@Component({
  selector: 'app-ad-item-block',
  templateUrl: './ad-item-block.component.html',
  styleUrls: ['./ad-item-block.component.scss']
})
  export class AdItemBlockComponent {
  isClosed: boolean = false;
  @Input() advertising: Advertising;

  constructor(
    private advertisingService: AdvertisingDataService,
  ) {
    this.advertising = this.advertisingService.getRandomAdv();
  }

  public OnClose(event): void {
    this.isClosed = true;
  }
}
