import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from '@main/main-page.component';

const router: Routes = [{
  path: '', component: MainPageComponent, data: {
    title: 'Main Page!'
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
    MainPageComponent
  ]
})
export class MainPageModule { }
