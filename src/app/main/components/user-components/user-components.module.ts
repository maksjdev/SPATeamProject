import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from '@components/user-components/user-info/user-info.component';
import {UserService} from '@shared/auth/user.service';
import {AppPipesModule} from '@shared/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    UserInfoComponent,
  ],
  declarations: [
    UserInfoComponent,
  ],
  providers: [
    UserService
  ]

})
export class UserComponentsModule { }
