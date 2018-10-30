import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '@header/header.component';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {UserComponentsModule} from '@components/user-components/user-components.module';
import {VisualComponentsModule} from '@components/visual-components/visual-components.module';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    UserComponentsModule,
    VisualComponentsModule,
    ActionsComponentsModule,
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent
  ]
})
export class HeaderModule { }
