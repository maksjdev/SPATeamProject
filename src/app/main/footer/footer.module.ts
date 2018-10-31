import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from '@footer/footer.component';
import {VisualComponentsModule} from '@components/visual-components/visual-components.module';

@NgModule({
  imports: [
    CommonModule,

    VisualComponentsModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})
export class FooterModule { }
