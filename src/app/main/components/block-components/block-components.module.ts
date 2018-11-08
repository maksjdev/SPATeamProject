import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemBlockComponent } from './news-item-block/news-item-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';
import {FullNewsBlockComponent} from '@components/block-components/full-news-block/full-news-block.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FullNewsBlockComponent,
    NewsItemBlockComponent,
    AdItemBlockComponent
  ],
  declarations: [
    FullNewsBlockComponent,
    NewsItemBlockComponent,
    AdItemBlockComponent
  ]
})
export class BlockComponentsModule { }
