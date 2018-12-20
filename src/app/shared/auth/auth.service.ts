import {Injectable} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {UserDataService} from '@shared/user-data.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {CONSTANTS} from '@shared/config/constants';
import {MockDataService} from '@shared/mock-data.service';
import {User} from '@shared/models/User';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginState: BehaviorSubject<boolean>;

  constructor(
    private userService: UserDataService,
    private mockDataService: MockDataService,
    private routeService: AppRoutingService,
    private restService: AppRestService
  ) {
    this.loginState = new BehaviorSubject(false);

    // Получили логин и пароль
    let login = localStorage.getItem(CONSTANTS.LOCAL_S.USER_LOGIN);
    let password = localStorage.getItem(CONSTANTS.LOCAL_S.USER_PASSWORD);
    if (login && password){
      this.onLogin(login, password, false);
    }
  }

  public getLoginState(): BehaviorSubject<boolean> {
    return this.loginState;
  }

  onLogin(login: string, password: string, save?: boolean): Promise<boolean> {
    // Логином может быть email
    return this.restService.onLogin(login, password).pipe(
      switchMap((value: HttpResponse<ArrayBuffer>) => {
        if (!value) { return of(null) }
        // Авторизация удалась
        let id = value['userId'];
        let token = value['token'];
        if (id && token) {
          this.userService.setCurrentJWT(token);
          return this.userService.getUserData(id);
        }
      }),
      catchError((err: Response) => {
        // Авторизация НЕ удалась
        alert(err['error']);
        return of();
      })
    ).toPromise().then((activeUser: User) => {
      // Получаем данные пользователя
      if (!activeUser) {
        return false;
      }
      this.userService.setCurrentUserData(activeUser);
      this.loginState.next(true);
      // Нужно сохранять его пароль и логин?
      if (save) {
        // Сохранили в локал сторадж
        localStorage.setItem(CONSTANTS.LOCAL_S.USER_LOGIN, login);
        localStorage.setItem(CONSTANTS.LOCAL_S.USER_PASSWORD, password);
      }
      return true;
    });
  }

  onLogout(): void {
    this.loginState.next(false);
    this.userService.setCurrentUserData(null);

    localStorage.removeItem(CONSTANTS.LOCAL_S.USER_LOGIN);
    localStorage.removeItem(CONSTANTS.LOCAL_S.USER_PASSWORD);
  }

  onRegister(realName: string, nickname: string, email: string, password: string, image?: any): Promise<boolean> {
    // Формируем запрос на сервер (через restService)
    let newUser = new User('0', realName, nickname, email, image, 0, null);
    return this.restService.onRegister(newUser, password).pipe(
      catchError((err: Response) => {
        // Регистрация НЕ удалась
        alert(err['error']);
        return of(false);
      })
    ).toPromise().then( (registered: boolean) => {
      return registered !== false;
    })
  }
}
