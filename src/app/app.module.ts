import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from '@routes/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from '@header/header.module';
import {FooterModule} from '@footer/footer.module';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {AppHttpService} from '@shared/http/app-http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfigLoadService} from '@shared/config/config-load.service';
import {DatePipe, registerLocaleData} from '@angular/common';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {AppStringService} from '@shared/services/app-string.service';
import {ShortenPipe} from 'ngx-pipes';
import {MainPageModule} from '@main/main-page.module';
import localeRu from '@angular/common/locales/ru';
import {AuthService} from '@shared/auth.service';
import {UserDataService} from '@shared/user-data.service';
import {AppScrollService} from '@shared/services/app-scroll.service';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {AuthInterceptor} from '@shared/http/auth-interceptor';
import {ErrorInterceptor} from '@shared/http/error-interceptor';
import {NgxPermissionsModule} from 'ngx-permissions';
import {DtoService} from '@shared/dto.service';

registerLocaleData(localeRu, 'ru');

export function initializeApp(configData: ConfigLoadService) {
  return () => configData.loadAppConfig();
}
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Used external Modules
    NgProgressModule,
    NgProgressHttpModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    // Custom Modules
    HeaderModule,
    MainPageModule,
    FooterModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AppRoutingModule,
    AppHttpService,
    AppRestService,
    DtoService,
    AuthService,

    UserDataService,
    AppDateTimeService,
    AppDialogService,
    AppStringService,
    AppScrollService,

    // Внедренные пайпы
    DatePipe, ShortenPipe,
    // Конфиг
    ConfigLoadService,
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigLoadService], multi: true},
    // Интерсепторы
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
