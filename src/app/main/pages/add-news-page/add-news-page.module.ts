import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';
import {BlockComponentsModule} from '@components/block-components/block-components.module';
import {AddNewsPageComponent} from '@pages/add-news-page/add-news-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {AppFormService} from '@shared/services/app-form.service';

const router: Routes = [{
  path: '', component: AddNewsPageComponent, data: {
    title: 'Add News Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    ActionsComponentsModule,
    BlockComponentsModule,
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AddNewsPageComponent
  ],
  providers: [
    AppFormService
  ]
})
export class AddNewsPageModule { }
