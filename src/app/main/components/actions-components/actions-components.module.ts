import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { SearchFieldComponent } from '@components/actions-components/search-field/search-field.component';
import { PeriodFilterComponent } from './period-filter/period-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategorySelectComponent } from './category-select/category-select.component';
import { FormsModule } from '@angular/forms';
import { DemoFunctionsComponent } from './demo-functions/demo-functions.component';
import { ListCategoryComponent } from './list-category/list-category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    SearchFieldComponent,
    LoginButtonsComponent,
    PeriodFilterComponent,
    CategorySelectComponent,
    DemoFunctionsComponent,
    ListCategoryComponent
  ],
  declarations: [
    LoginButtonsComponent,
    SearchFieldComponent,
    PeriodFilterComponent,
    CategorySelectComponent,
    DemoFunctionsComponent,
    ListCategoryComponent
  ]
})
export class ActionsComponentsModule { }
