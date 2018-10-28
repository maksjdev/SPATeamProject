import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor(
    private routingService: AppRoutingService,
    private title: Title
  ) { }

  ngOnInit() {
    let queryParam = {
      ['param']: 'some',
    };
    this.routingService.setQueryParam(queryParam)
  }

}
