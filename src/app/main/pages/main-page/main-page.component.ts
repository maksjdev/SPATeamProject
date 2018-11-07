import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {ConfigService} from '@shared/config/config.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor(
    private routingService: AppRoutingService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    // Просто для демонстрации ставим параметр
    let queryParam = {['param']: 'some'};
    this.routingService.setQueryParam(queryParam);

    // Просим у сермиса данных - данные о каком-то количестве новостей
    let nuberOfNews = this.configService.getNumberOfNews();
    console.log(`Сервер дай мне ${nuberOfNews} новостей, пожалуйста :з`);
  }

}
