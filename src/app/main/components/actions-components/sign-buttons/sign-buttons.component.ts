import {Component} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-sign-buttons',
  templateUrl: './sign-buttons.component.html',
  styleUrls: ['./sign-buttons.component.scss']
})
export class SignButtonsComponent {

  constructor(
    private routerService: AppRoutingService
  ) { }

  OnSignUp (event) {
    this.routerService.goToLinkSave(CONSTANTS.APP.REGISTRATION);
  }
  OnSignIn (event) {
    this.routerService.goToLinkSave(CONSTANTS.APP.LOGIN);
  }
}
