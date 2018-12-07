import { Injectable } from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {UserService} from '@shared/user.service';
import {BehaviorSubject} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {CONSTANTS} from '@shared/config/constants';
import {MockDataService} from '@shared/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private strLogin = 'userLogin';
  private strPassword = 'userPassword';
  loginState: BehaviorSubject<boolean>;

  constructor(
    private userService: UserService,
    private mockDataService: MockDataService,
    private routeService: AppRoutingService,
    private restService: AppRestService
  ) {
    this.loginState = new BehaviorSubject(false);

    // Получили логин и пароль
    let login = localStorage.getItem(this.strLogin);
    let password = localStorage.getItem(this.strPassword);
    if (login && password){
      this.onLogin(login, password, false);
    }
  }

  public getLoginState(): BehaviorSubject<boolean> {
    return this.loginState;
  }

  onLogin(login: string, password: string, save?: boolean) {
    // Логином может быть nickname || email
    // Формируем запрос на сервер (через restService)

    // Ждем ответа сервера ...

    // Ок? Получаем данные текущего user
    let activeUser = this.mockDataService.getMockActiveUser();
    this.userService.setUserData(activeUser);
    this.loginState.next(true);

    // Нужно сохранять его пароль и логин?
    if (save){
      // Сохранили в локал сторадж
      localStorage.setItem(this.strLogin, login);
      localStorage.setItem(this.strPassword, password);
    }

    // Перенаправляем на исходную страницу
    let backUrl: string = this.routeService.getQueryParam(CONSTANTS.QUERY.BACK_URL);
    let backParams: string = this.routeService.getQueryParam(CONSTANTS.QUERY.BACK_PARAMS);
    let params = backParams? JSON.parse(backParams) : {};
    backUrl? this.routeService.goToLinkWithQuery(backUrl, false, params) : this.routeService.goToLink(CONSTANTS.APP.MAIN);
  }

  onLogout(): void {
    this.loginState.next(false);
    this.userService.setUserData(null);

    localStorage.removeItem(this.strLogin);
    localStorage.removeItem(this.strPassword);
  }

  onRegister(realName: string, nickname: string, email: string, password: string, image?: any) {
    // Формируем запрос на сервер (через restService)
    // Ждем ответа (ок? логин)
    this.onLogin(email, password);
  }
}
