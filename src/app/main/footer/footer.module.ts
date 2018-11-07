import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from '@footer/footer.component';
import {VisualComponentsModule} from '@components/visual-components/visual-components.module';
import {BlockComponentsModule} from '@components/block-components/block-components.module';

@NgModule({
  imports: [
    CommonModule,

    VisualComponentsModule,
    //BlockComponentsModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})
export class FooterModule { }
