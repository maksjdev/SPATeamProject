import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemBlockComponent } from './news-item-block/news-item-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';
import { StatisticTableComponent } from './statistic-table/statistic-table.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent
  ],
  declarations: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent
  ]
})
export class BlockComponentsModule { }
