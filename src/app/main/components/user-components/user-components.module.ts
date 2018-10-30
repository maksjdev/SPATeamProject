import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInfoComponent} from '@components/user-components/user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UserInfoComponent
  ],
  declarations: [
    UserInfoComponent
  ]
})
export class UserComponentsModule { }
