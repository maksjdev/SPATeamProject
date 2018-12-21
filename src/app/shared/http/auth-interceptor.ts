import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDataService} from '@shared/user-data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // При отправке: добавляем токен, если он есть
    const userService = this.injector.get(UserDataService);
    let currentJWT = userService.getCurrentJWT();
    if (currentJWT && currentJWT.length > 10) {
      request = request.clone({
        setHeaders: {
          Authorization: currentJWT
        }
      });
    }
    return next.handle(request);
  }
}
