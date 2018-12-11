import { Injectable } from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {UserDataService} from '@shared/user-data.service';
import {BehaviorSubject} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {CONSTANTS} from '@shared/config/constants';
import {MockDataService} from '@shared/mock-data.service';
import {User} from '@shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private strLogin = 'userLogin';
  private strPassword = 'userPassword';
  loginState: BehaviorSubject<boolean>;

  constructor(
    private userService: UserDataService,
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
    // Произвели валидацию
    this.restService.onLogin(login, password);
    // Ждем ответа сервера ...
    let activeUser = this.mockDataService.getMockActiveUser();

    // Ок? Уже прислали данные
    this.userService.setCurrentUserData(activeUser);
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
    this.userService.setCurrentUserData(null);

    localStorage.removeItem(this.strLogin);
    localStorage.removeItem(this.strPassword);
  }

  onRegister(realName: string, nickname: string, email: string, password: string, image?: any) {
    // Формируем запрос на сервер (через restService)
    let newUser = new User('0', realName, nickname, email, image, 0, null);
    this.restService.onRegister(newUser, password);
    // Ждем ответа (ок? логин)
    this.onLogin(email, password);
  }
}
