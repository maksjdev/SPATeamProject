import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullLogoComponent} from '@components/visual-components/full-logo/full-logo.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {RouterModule} from '@angular/router';
import {FullLogoPngComponent} from '@components/visual-components/full-logo-png/full-logo-png.component';
import {UserDataService} from '@shared/user-data.service';
import {AppPipesModule} from '@shared/pipes/app-pipes.module';
import {UserInfoComponent} from '@components/visual-components/user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppPipesModule,
  ],
  exports: [
    FullLogoComponent,
    SocialLinksComponent,
    FullLogoPngComponent,
    UserInfoComponent
  ],
  declarations: [
    FullLogoComponent,
    SocialLinksComponent,
    FullLogoPngComponent,
    UserInfoComponent
  ],
  providers: [
    UserDataService
  ]
})
export class VisualComponentsModule { }
