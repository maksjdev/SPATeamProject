import { Injectable } from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {UserService} from '@shared/auth/user.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backUrl: string = 'back_url';
  private backParams: string = 'back_params';
  loginState: BehaviorSubject<boolean>;

  constructor(
    private userService: UserService,
    private routeService: AppRoutingService,
  ) {
    this.loginState = new BehaviorSubject(true);
  }

  onLogin(login: string, password: string, save?: boolean) {
    // Идем на сервер и если все окей выполняем это:
    // Перенаправляем на исходную страницу
    let backUrl: string = this.routeService.getQueryParam(this.backUrl);
    let backParams: string = this.routeService.getQueryParam(this.backParams);
    backUrl? this.routeService.goToLink(backUrl) : this.routeService.goToLink('main');
    if (backParams) setTimeout( _ => {
      this.routeService.setQueryParam(JSON.parse(backParams));
    }, 10);

    this.loginState.next(true);
  }
  onLogout(): void {
    this.loginState.next(false);
  }

  public getLoginState(): BehaviorSubject<boolean> {
    return this.loginState;
  }
}
