import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '@pages/login-page/login-page.component';
import {UserComponentsModule} from '@components/user-components/user-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {MatInputModule} from '@angular/material';

const router: Routes = [{
  path: '', component: LoginPageComponent, data: {
    title: 'Login Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserComponentsModule,

    MatInputModule,
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LoginPageComponent
  ],
  providers: [
    AppFormService
  ]
})
export class LoginPageModule { }
