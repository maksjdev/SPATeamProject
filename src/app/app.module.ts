import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
    FooterModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AppHttpService,
    AppRestService,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
