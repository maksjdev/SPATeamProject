import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullLogoComponent} from '@components/visual-components/full-logo/full-logo.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {RouterModule} from '@angular/router';
import {FullLogoPngComponent} from '@components/visual-components/full-logo-png/full-logo-png.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FullLogoComponent,
    SocialLinksComponent,
    FullLogoPngComponent,
  ],
  declarations: [
    FullLogoComponent,
    SocialLinksComponent,
    FullLogoPngComponent,
  ]
})
export class VisualComponentsModule { }
