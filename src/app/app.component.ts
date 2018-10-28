import {Component, OnDestroy} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy{
  private subscribe: Subscription;

  constructor(
    private restService: AppRestService
  ){}

  public loadData(event){
    this.subscribe = this.restService.getMockData('users').subscribe( (data) => {
      Object.keys(data).length > 0? alert(JSON.stringify(data[0])) : alert('Запути сервер *npm mock*, дурашка))');
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
