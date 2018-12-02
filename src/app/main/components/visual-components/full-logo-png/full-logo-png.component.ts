import {Component} from '@angular/core';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-full-logo-png',
  templateUrl: './full-logo-png.component.html',
  styleUrls: ['./full-logo-png.component.scss']
})
export class FullLogoPngComponent {
  title: string;
  mainLink: string;
  logoLink: string;

  constructor() {
    this.title = CONSTANTS.APP.TITLE;
    this.mainLink = CONSTANTS.APP.MAIN;
    this.logoLink = '../../../../../assets/images/new_string.png';
  }
}
