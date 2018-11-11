import {Component} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';

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
    this.routerService.goToLink('registration');
  }
  OnSignIn (event) {
    this.routerService.goToLink('login');
  }
}
