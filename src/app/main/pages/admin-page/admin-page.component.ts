import {Component} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  constructor(
    private routingService: AppRoutingService
  ) { }

  public onAddNews(event){
    this.routingService.goToLink(CONSTANTS.APP.CREATE);
  }
}
