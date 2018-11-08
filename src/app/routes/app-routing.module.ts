import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  //{path: '**', redirectTo: 'main'},

  {path: 'main', loadChildren: '@main/main-page.module#MainPageModule'},
  {path: 'news', loadChildren: '@news/news-page.module#NewsPageModule'},
  {path: 'login', loadChildren: '@login/login-page.module#LoginPageModule'},
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
