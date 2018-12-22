import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignButtonsComponent} from './sign-buttons/sign-buttons.component';
import {SearchFieldComponent} from '@components/actions-components/search-field/search-field.component';
import {PeriodFilterComponent} from './period-filter/period-filter.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CategorySelectComponent} from './category-select/category-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HtmlEditComponent} from './html-edit/html-edit.component';
import {PaginationComponent} from '@components/actions-components/pagination/pagination.component';
import {RatingFilterComponent} from './rating-filter/rating-filter.component';
import {NgxEditorModule} from 'ngx-editor';
import {ImageFieldComponent} from './image-field/image-field.component';
import {CommentFormComponent} from '@components/actions-components/comment-form/comment-form.component';
import {MatInputModule} from '@angular/material';
import {AppFormService} from '@shared/services/app-form.service';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxEditorModule,

    MatInputModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [
    SearchFieldComponent,
    SignButtonsComponent,
    PeriodFilterComponent,
    CategorySelectComponent,
    HtmlEditComponent,
    PaginationComponent,
    RatingFilterComponent,
    ImageFieldComponent,
    CommentFormComponent,
  ],
  declarations: [
    SignButtonsComponent,
    SearchFieldComponent,
    PeriodFilterComponent,
    CategorySelectComponent,
    HtmlEditComponent,
    PaginationComponent,
    RatingFilterComponent,
    ImageFieldComponent,
    CommentFormComponent,
  ],
  providers: [
    AppFormService
  ]
})
export class ActionsComponentsModule { }
