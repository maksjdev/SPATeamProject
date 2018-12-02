import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from '@admin/admin-page.component';
import {BlockComponentsModule} from '@components/block-components/block-components.module';

const router: Routes = [{
  path: '', component: AdminPageComponent, data: {
    title: 'Admin Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    BlockComponentsModule,
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AdminPageComponent
  ]
})
export class AdminPageModule { }
