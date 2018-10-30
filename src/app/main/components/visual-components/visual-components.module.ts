import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullLogoComponent} from '@components/visual-components/full-logo/full-logo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FullLogoComponent
  ],
  declarations: [
    FullLogoComponent
  ]
})
export class VisualComponentsModule { }
