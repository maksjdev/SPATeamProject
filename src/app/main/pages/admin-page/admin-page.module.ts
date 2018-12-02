import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from '@admin/admin-page.component';
import {BlockComponentsModule} from '@components/block-components/block-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';

const router: Routes = [{
  path: '', component: AdminPageComponent, data: {
    title: 'Admin Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
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
