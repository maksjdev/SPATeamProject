import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';
import {BlockComponentsModule} from '@components/block-components/block-components.module';
import {AddNewsPageComponent} from '@pages/add-news-page/add-news-page.component';

const router: Routes = [{
  path: '', component: AddNewsPageComponent, data: {
    title: 'Add News Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),

    ActionsComponentsModule,
    BlockComponentsModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AddNewsPageComponent
  ]
})
export class AddNewsPageModule { }
