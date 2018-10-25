import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  //{path: '**', redirectTo: 'main'},

  {path: 'news', loadChildren: '@news/news-page.module#NewsPageModule'},
  {path: 'main', loadChildren: '@main/main-page.module#MainPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
