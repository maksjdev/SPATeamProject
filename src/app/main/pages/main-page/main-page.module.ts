import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from '@main/main-page.component';
import {BlockComponentsModule} from '@components/block-components/block-components.module';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';

@NgModule({
  imports: [
    CommonModule,

    BlockComponentsModule,
    ActionsComponentsModule
  ],
  exports: [
    MainPageComponent
  ],
  declarations: [
    MainPageComponent,
  ]
})
export class MainPageModule { }
