import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-full-logo',
  templateUrl: './full-logo.component.html',
  styleUrls: ['./full-logo.component.scss']
})
export class FullLogoComponent implements OnInit {
  title: string;

  constructor() {
    this.title = CONSTANTS.APP.TITLE;
    console.log(this.title);
  }

  ngOnInit() {
  }

}
