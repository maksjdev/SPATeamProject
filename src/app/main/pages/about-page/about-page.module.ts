import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutPageComponent} from '@pages/about-page/about-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';
import {BlockComponentsModule} from '@components/block-components/block-components.module';

const router: Routes = [{
  path: '', component: AboutPageComponent, data: {
    title: 'About Page!'
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
    AboutPageComponent
  ]
})
export class AboutPageModule { }
