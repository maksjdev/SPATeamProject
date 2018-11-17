import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DemoPageComponent} from '@demo/demo-page.component';

const router: Routes = [{
  path: '', component: DemoPageComponent, data: {
    title: 'Demo Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),

  ],
  exports: [
    RouterModule
  ],
  declarations: [
    DemoPageComponent
  ]
})
export class DemoPageModule { }
