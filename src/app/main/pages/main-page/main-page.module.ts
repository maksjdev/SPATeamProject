import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from '@main/main-page.component';
import {BlockComponentsModule} from '@components/block-components/block-components.module';

const router: Routes = [{
  path: '', component: MainPageComponent, data: {
    title: 'Main Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),

    BlockComponentsModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    MainPageComponent
  ]
})
export class MainPageModule { }
