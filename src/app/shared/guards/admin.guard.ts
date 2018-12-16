import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {CONSTANTS} from '@shared/config/constants';
import {AuthService} from '@shared/auth/auth.service';
import {AppRoutingService} from '@routes/app-routing.service';
import {UserDataService} from '@shared/user-data.service';
import {User} from '@shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private userService: UserDataService,
    private routerService: AppRoutingService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isLogged: boolean = this.authService.getLoginState().getValue();

    if (isLogged) {
      if (this.userService.isAdmin()) {
        return true;
      } else {
        this.routerService.goToLink(CONSTANTS.APP.MAIN);
        return false;
      }
    } else {
      // Не залогинен -> редирект на страницу логина с сохранением линка
      let url = this.routerService.getCleanUrl(state.url);
      let params = next.queryParams;

      let paramsObj = {[CONSTANTS.QUERY.BACK_URL]: url, [CONSTANTS.QUERY.BACK_PARAMS]: JSON.stringify(params)};
      this.routerService.goToLinkWithQuery(CONSTANTS.APP.LOGIN, false, paramsObj);
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    let isLogged: boolean = this.authService.getLoginState().getValue();

    if (isLogged) {
      if (this.userService.isAdmin()) {
        return true;
      } else {
        this.routerService.goToLink(CONSTANTS.APP.MAIN);
        return false;
      }
    } else {
      // Не залогинен -> редирект на страницу логина
      this.routerService.goToLink(CONSTANTS.APP.LOGIN);
      return false;
    }
  }
}
