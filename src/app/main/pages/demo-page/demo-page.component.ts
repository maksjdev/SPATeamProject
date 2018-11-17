import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent implements OnDestroy {
  private subscribe: Subscription;

  constructor(
    private restService: AppRestService,
  ) { }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  public loadData(event){
    this.subscribe = this.restService.getMockData('users').subscribe( (data) => {
      Object.keys(data).length > 0 ? alert(JSON.stringify(data[0])) : alert('Запути сервер *npm mock*, дурашка))');
    });
  }
}
