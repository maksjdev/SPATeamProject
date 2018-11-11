import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsBigBlockComponent } from './news-big-block/news-big-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';
import { StatisticTableComponent } from './statistic-table/statistic-table.component';
import {NewsDataService} from '@shared/news-data.service';
import {TrimStringPipe} from '@shared/pipes/trim-string.pipe';
import {AppPipesModule} from '@shared/pipes/app-pipes.module';
import { CategoryItemBlockComponent } from './category-item-block/category-item-block.component';
import { ActionsComponentsModule } from '@components/actions-components/actions-components.module';
import { ListCategoryItemComponent } from '@components/block-components/category-item-block/list-category-item/list-category-item.component';
import { TopNewsBlockComponent } from './top-news-block/top-news-block.component';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    NewsBigBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent,
    TopNewsBlockComponent
  ],
  declarations: [
    NewsBigBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent,
    ListCategoryItemComponent,
    TopNewsBlockComponent
  ],
  providers: [
    NewsDataService,
  ]
})
export class BlockComponentsModule { }
