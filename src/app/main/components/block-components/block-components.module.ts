import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemBlockComponent } from './news-item-block/news-item-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';
import { StatisticTableComponent } from './statistic-table/statistic-table.component';
import { CategoryItemBlockComponent } from './category-item-block/category-item-block.component';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';

@NgModule({
  imports: [
    CommonModule,
    ActionsComponentsModule
  ],
  exports: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent
  ],
  declarations: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent
  ]
})
export class BlockComponentsModule { }
