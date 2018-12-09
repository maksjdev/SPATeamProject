import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsBigBlockComponent} from './news-big-block/news-big-block.component';
import {AdItemBlockComponent} from './ad-item-block/ad-item-block.component';
import {StatisticTableComponent} from './statistic-table/statistic-table.component';
import {NewsDataService} from '@shared/news-data.service';
import {AppPipesModule} from '@shared/pipes/app-pipes.module';
import {CategoryBlockComponent} from './category-block/category-block.component';
import {TopNewsBlockComponent} from './top-news-block/top-news-block.component';
import {NewsSmallBlockComponent} from '@components/block-components/news-small-block/news-small-block.component';
import {FullNewsBlockComponent} from '@components/block-components/full-news-block/full-news-block.component';
import {CommentFullItemComponent} from './comment-full-item/comment-full-item.component';
import {CategoryDataService} from '@shared/category-data.service';
import {AdvertisingDataService} from '@shared/advertising-data.service';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule,
  ],
  exports: [
    NewsBigBlockComponent,
    NewsSmallBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryBlockComponent,
    TopNewsBlockComponent,
    StatisticTableComponent,
    FullNewsBlockComponent,
    CommentFullItemComponent,
  ],
  declarations: [
    NewsBigBlockComponent,
    NewsSmallBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
    CategoryBlockComponent,
    TopNewsBlockComponent,
    FullNewsBlockComponent,
    CommentFullItemComponent,
  ],
  providers: [
    NewsDataService,
    CategoryDataService,
    AdvertisingDataService,
  ]
})
export class BlockComponentsModule { }
