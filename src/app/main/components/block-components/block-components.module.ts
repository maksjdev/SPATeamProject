import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemBlockComponent } from './news-item-block/news-item-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';
import { StatisticTableComponent } from './statistic-table/statistic-table.component';
import { CategoryItemBlockComponent } from './category-item-block/category-item-block.component';
import { ActionsComponentsModule } from '@components/actions-components/actions-components.module';
import { ListCategoryItemComponent } from '@components/block-components/category-item-block/list-category-item/list-category-item.component';
import { TopNewsBlockComponent } from './top-news-block/top-news-block.component';

@NgModule({
  imports: [
    CommonModule,
    ActionsComponentsModule
  ],
  exports: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent,
    TopNewsBlockComponent
  ],
  declarations: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent,
    ListCategoryItemComponent,
    TopNewsBlockComponent
  ]
})
export class BlockComponentsModule { }
