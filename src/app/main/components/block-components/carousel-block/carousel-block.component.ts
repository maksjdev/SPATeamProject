import {Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-carousel-block',
  templateUrl: './carousel-block.component.html',
  styleUrls: ['./carousel-block.component.scss']
})
export class CarouselBlockComponent {
  @Input() imageArr: Array<string> = [];
  // https://www.npmjs.com/package/ng-simple-slideshow

  constructor(){}

  @ViewChild('slideshow') slideshow: any;
}
