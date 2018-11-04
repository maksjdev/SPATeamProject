import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginButtonsComponent} from './login-buttons/login-buttons.component';
import {SearchFieldComponent} from '@components/actions-components/search-field/search-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SearchFieldComponent,
    LoginButtonsComponent
  ],
  declarations: [
    LoginButtonsComponent,
    SearchFieldComponent
  ]
})
export class ActionsComponentsModule { }
