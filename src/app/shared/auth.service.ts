import {Injectable} from '@angular/core';
import {AppRoutingService} from '../routes/app-routing.service';
import {UserDataService} from './user-data.service';
import {BehaviorSubject, of} from 'rxjs';
import {AppRestService} from './http/app-rest.service';
import {User} from './models/User';
import {catchError, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {CONSTANTS} from '@shared/config/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginState: BehaviorSubject<boolean>;

  constructor(
    private userService: UserDataService,
    private routeService: AppRoutingService,
    private restService: AppRestService,
    private dialogService: AppDialogService,
  ) {
    this.loginState = new BehaviorSubject(false);

    // Получили логин и пароль
    let login = localStorage.getItem(CONSTANTS.LOCAL_S.USER_LOGIN);
    let password = localStorage.getItem(CONSTANTS.LOCAL_S.USER_PASSWORD);
    if (login && password){
      this.onLogin(login, password, true);
    }
  }

  public getLoginState(): BehaviorSubject<boolean> {
    return this.loginState;
  }

  onLogin(login: string, password: string, save?: boolean): Promise<boolean> {
    // Логином может быть email
    if (this.loginState){
      this.onLogout();
    }
    return this.restService.restOnLogin(login, password).pipe(
      switchMap((value: HttpResponse<ArrayBuffer>) => {
        if (!value) { return of(null) }
        // Авторизация удалась
        let id = value['userId'];
        let token = value['token'];
        if (id && token) {
          this.userService.setCurrentJWT(token);
          localStorage.setItem(CONSTANTS.LOCAL_S.JWT_TOKEN, token);
          return this.userService.getUserData(id);
        }
      }),
      catchError((errorMsg: string) => {
        // Авторизация НЕ удалась
        this.dialogService.showToastError(errorMsg);
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
      if (save && login && password) {
        localStorage.setItem(CONSTANTS.LOCAL_S.USER_LOGIN, login);
        localStorage.setItem(CONSTANTS.LOCAL_S.USER_PASSWORD, password);
      }
      return true;
    });
  }

  onLogout(): void {
    this.loginState.next(false);
    this.userService.deleteCurrentUserData();
    this.routeService.goToLink(CONSTANTS.APP.MAIN);

    localStorage.removeItem(CONSTANTS.LOCAL_S.USER_LOGIN);
    localStorage.removeItem(CONSTANTS.LOCAL_S.USER_PASSWORD);
    localStorage.removeItem(CONSTANTS.LOCAL_S.JWT_TOKEN);
  }

  onRegister(realName: string, nickname: string, email: string, password: string, image?: any): Promise<boolean> {
    let newUser = new User('0', realName, nickname, email, image, 0, null);
    return this.restService.restOnRegister(newUser, password).pipe(
      catchError((errorMsg: string) => {
        // Регистрация НЕ удалась
        this.dialogService.showToastError(errorMsg);
        return of(false);
      })
    ).toPromise().then( (registered: boolean) => {
      return registered !== false;
    })
  }
}
