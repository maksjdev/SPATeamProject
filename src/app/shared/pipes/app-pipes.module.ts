import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrimStringPipe} from '@shared/pipes/trim-string.pipe';
import { DateTransformPipe } from './date-transform.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TrimStringPipe,
    DateTransformPipe
  ],
  declarations: [
    // Пайпы приложения
    TrimStringPipe,
    DateTransformPipe
  ],
})
export class AppPipesModule { }
