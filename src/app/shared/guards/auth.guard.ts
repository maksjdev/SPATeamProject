import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {AuthService} from '../auth.service';
import {CONSTANTS} from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private routerService: AppRoutingService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getLoginState().getValue()) {
      // Залогинен -> проходите, сэр
      return true;
    } else {
      // Не залогинен -> редирект на страницу логина с сохранением линка
      let url = this.routerService.getCleanUrl(state.url);
      let params = route.queryParams;

      let paramsObj = { [CONSTANTS.QUERY.BACK_URL]: url, [CONSTANTS.QUERY.BACK_PARAMS]: JSON.stringify(params) };
      this.routerService.goToLinkWithQuery(CONSTANTS.APP.LOGIN, false, paramsObj);
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getLoginState().getValue()) {
      // Залогинен -> загружаем, сэр
      return true;
    } else {
      // Не залогинен -> редирект на страницу логина
      this.routerService.goToLink(CONSTANTS.APP.LOGIN);
      return false;
    }
  }
}
