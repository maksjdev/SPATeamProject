import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-full-logo',
  templateUrl: './full-logo.component.html',
  styleUrls: ['./full-logo.component.scss']
})
export class FullLogoComponent implements OnInit {
  @Input() title: string = "Default";

  constructor() { }

  ngOnInit() {
  }

}
