import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NewsPageComponent} from '@news/news-page.component';
import {BlockComponentsModule} from '@components/block-components/block-components.module';

const router: Routes = [{
  path: '', component: NewsPageComponent, data: {
    title: 'News Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    BlockComponentsModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    NewsPageComponent
  ]
})
export class NewsPageModule { }
