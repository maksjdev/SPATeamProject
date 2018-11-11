import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullLogoComponent} from '@components/visual-components/full-logo/full-logo.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import { QuoteBlockComponent } from './quote-block/quote-block.component';
import { ListBlockComponent } from './list-block/list-block.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    QuoteBlockComponent,
    ListBlockComponent,
    FullLogoComponent,
    SocialLinksComponent,
  ],
  declarations: [
    FullLogoComponent,
    SocialLinksComponent,
    QuoteBlockComponent,
    ListBlockComponent,
  ]
})
export class VisualComponentsModule { }
