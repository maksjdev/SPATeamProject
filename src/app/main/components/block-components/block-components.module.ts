import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsBigBlockComponent} from './news-big-block/news-big-block.component';
import {AdItemBlockComponent} from './ad-item-block/ad-item-block.component';
import {StatisticTableComponent} from './statistic-table/statistic-table.component';
import {NewsDataService} from '@shared/news-data.service';
import {AppPipesModule} from '@shared/pipes/app-pipes.module';
import {CategoryItemBlockComponent} from './category-block/category-item-block.component';
import {TopNewsBlockComponent} from './top-news-block/top-news-block.component';
import {NewsSmallBlockComponent} from '@components/block-components/news-small-block/news-small-block.component';
import {FullNewsBlockComponent} from '@components/block-components/full-news-block/full-news-block.component';
import {CommentFullItemComponent } from './comment-full-item/comment-full-item.component';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    NewsBigBlockComponent,
    NewsSmallBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent,
    TopNewsBlockComponent,
    StatisticTableComponent,
    FullNewsBlockComponent,
    CommentFullItemComponent
  ],
  declarations: [
    NewsBigBlockComponent,
    NewsSmallBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryItemBlockComponent,
    TopNewsBlockComponent,
    FullNewsBlockComponent,
    CommentFullItemComponent
  ],
  providers: [
    NewsDataService,
  ]
})
export class BlockComponentsModule { }
