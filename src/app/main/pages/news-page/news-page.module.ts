import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NewsPageComponent} from '@news/news-page.component';

const router: Routes = [{
  path: '', component: NewsPageComponent, data: {
    title: 'News Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
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
