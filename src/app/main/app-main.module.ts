import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [{
  path: '', component: MainComponent, data: {}
}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: [
    MainComponent,
  ],
})
export class AppMainModule { }
