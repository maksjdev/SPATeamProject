import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullLogoComponent} from '@components/visual-components/full-logo/full-logo.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FullLogoComponent,
    SocialLinksComponent,
  ],
  declarations: [
    FullLogoComponent,
    SocialLinksComponent,
  ]
})
export class VisualComponentsModule { }
