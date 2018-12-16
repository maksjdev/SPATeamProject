import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';
import {BlockComponentsModule} from '@components/block-components/block-components.module';
import {AddNewsPageComponent} from '@add-news/add-news-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {AppFormService} from '@shared/services/app-form.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {DeactivateGuard} from '@shared/guards/deactivate.guard';

const router: Routes = [{
  path: '', component: AddNewsPageComponent, canDeactivate: [DeactivateGuard], data: {
    title: 'Add News Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
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
    AppFormService,
    DeactivateGuard,
  ]
})
export class AddNewsPageModule { }
