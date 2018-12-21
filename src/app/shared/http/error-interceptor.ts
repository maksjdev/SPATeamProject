import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '@shared/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // При принятии use handle
    return next.handle(request).pipe(
        catchError(err => {
        if (err.status === 401) {
          // Если сервер сказал что ты не авторизирован
          const authService = this.injector.get(AuthService);
          authService.onLogout();
          // location.reload(true);
        }
        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }
}
