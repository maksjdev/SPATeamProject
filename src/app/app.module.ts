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
import {HttpClientModule} from '@angular/common/http';
import {ConfigLoadService} from '@shared/config/config-load.service';
import {DatePipe, registerLocaleData} from '@angular/common';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {AppStringService} from '@shared/services/app-string.service';
import {ShortenPipe} from 'ngx-pipes';
import {MainPageModule} from '@main/main-page.module';
import localeRu from '@angular/common/locales/ru';
import {AuthService} from '@shared/auth/auth.service';
import {UserService} from '@shared/user.service';

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

    // Used Modules
    NgProgressModule,
    NgProgressHttpModule.forRoot(),

    // Custom Modules
    HeaderModule,
    MainPageModule,
    FooterModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    // Кастомные сервисы
    AuthService,
    UserService,

    AppHttpService,
    AppRestService,
    AppRoutingModule,
    AppDateTimeService,
    AppStringService,

    // Внедренные херни
    DatePipe, ShortenPipe,
    ConfigLoadService,
    {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigLoadService], multi: true},
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
