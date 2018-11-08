import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullLogoComponent} from '@components/visual-components/full-logo/full-logo.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import { QuoteComponent } from './quote/quote.component';
import { QuoteBlockComponent } from './quote-block/quote-block.component';
import { ListBlockComponent } from './list-block/list-block.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FullLogoComponent,
    SocialLinksComponent,
  ],
  declarations: [
    FullLogoComponent,
    SocialLinksComponent,
    QuoteComponent,
    QuoteBlockComponent,
    ListBlockComponent,
  ]
})
export class VisualComponentsModule { }
