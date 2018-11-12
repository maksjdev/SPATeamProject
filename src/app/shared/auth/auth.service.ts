import { Injectable } from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {UserService} from '@shared/auth/user.service';
import {BehaviorSubject} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {CONSTANTS} from '@shared/config/constants';

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
    private restService: AppRestService
  ) {
    this.loginState = new BehaviorSubject(true);
  }

  onLogin(login: string, password: string, save?: boolean) {
    // Логином может быть nickname || email
    // Формируем запрос на сервер (через restService)
    this.loginState.next(true);

    // Ждем ответа (ок? Получаем данные текущего user, Перенаправляем на исходную страницу)
    let backUrl: string = this.routeService.getQueryParam(this.backUrl);
    let backParams: string = this.routeService.getQueryParam(this.backParams);
    backUrl? this.routeService.goToLink(backUrl) : this.routeService.goToLink(CONSTANTS.APP.MAIN);
    if (backParams) setTimeout( _ => {
      this.routeService.setQueryParam(JSON.parse(backParams));
    }, 10);
  }

  onLogout(): void {
    this.loginState.next(false);
  }
  public getLoginState(): BehaviorSubject<boolean> {
    return this.loginState;
  }

  onRegister(realName: string, nickname: string, email: string, password: string, image?: any) {
    // Формируем запрос на сервер (через restService)
    // Ждем ответа (ок? логин)
    this.onLogin(email, password);
  }
}
