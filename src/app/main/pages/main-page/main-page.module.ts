import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from '@main/main-page.component';
import {SharedComponentsModule} from '@components/shared-components.module';

const router: Routes = [{
  path: '', component: MainPageComponent, data: {}
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
    MainPageComponent
  ]
})
export class MainPageModule { }
