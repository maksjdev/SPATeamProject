import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrimStringPipe} from '@shared/pipes/trim-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TrimStringPipe
  ],
  declarations: [
    // Пайпы приложения
    TrimStringPipe
  ],
})
export class AppPipesModule { }
