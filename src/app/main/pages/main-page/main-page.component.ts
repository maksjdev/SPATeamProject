import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;

  constructor(
    private restService: AppRestService,
    private routingService: AppRoutingService,
    private title: Title
  ) { }

  ngOnInit() {
    let queryParam = {
      ['param']: 'some',
    };
    this.routingService.setQueryParam(queryParam)
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  public loadData(event){
    this.subscribe = this.restService.getMockData('users').subscribe( (data) => {
      Object.keys(data).length > 0? alert(JSON.stringify(data[0])) : alert('Запути сервер *npm mock*, дурашка))');
    });
  }
}
