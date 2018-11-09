import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';
import {BlockComponentsModule} from '@components/block-components/block-components.module';
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

    ActionsComponentsModule,
    BlockComponentsModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    DemoPageComponent
  ]
})
export class DemoPageModule { }
