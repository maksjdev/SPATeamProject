import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemBlockComponent } from './news-item-block/news-item-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NewsItemBlockComponent,
    AdItemBlockComponent
  ],
  declarations: [
    NewsItemBlockComponent,
    AdItemBlockComponent
  ]
})
export class BlockComponentsModule { }
