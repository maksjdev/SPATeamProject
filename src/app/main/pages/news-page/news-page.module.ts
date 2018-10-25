import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NewsPageComponent} from '@news/news-page.component';
import {SharedComponentsModule} from '@components/shared-components.module';

const router: Routes = [{
  path: '', component: NewsPageComponent, data: {}
}];

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
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
