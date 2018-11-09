import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponentsModule} from '@components/user-components/user-components.module';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationPageComponent} from '@registration/registration-page.component';

const router: Routes = [{
  path: '', component: RegistrationPageComponent, data: {
    title: 'Registration Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    UserComponentsModule,
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    RegistrationPageComponent
  ]
})
export class RegistrationPageModule { }
