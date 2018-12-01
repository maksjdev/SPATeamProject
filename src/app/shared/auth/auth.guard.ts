import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route} from '@angular/router';
import { Observable } from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {AuthService} from '@shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private loginUrl: string = '/login';

  constructor(
    private router: Router,
    private authService: AuthService,
    private routerService: AppRoutingService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.getLoginState().getValue()) {
      // Залогинен -> проходите, сэр
      return true;
    } else {
      // Не залогинен -> редирект на страницу логина с сохранением линка
      let url = this.routerService.getCleanUrl(state.url);
      let params = route.queryParams;

      this.router.navigate([this.loginUrl],
        { queryParams: { back_url: url, back_params: JSON.stringify(params) }, skipLocationChange: true});
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getLoginState().getValue()) {
      // Залогинен -> загружаем, сэр
      return true;
    } else {
      // Не залогинен -> редирект на страницу логина
      this.router.navigate([this.loginUrl]);
      return false;
    }
  }
}
