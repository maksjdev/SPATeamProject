import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from '@main/main-page.component';
import {AuthGuard} from '@shared/auth/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  //{path: '**', redirectTo: 'main'},

  {path: 'main', component: MainPageComponent, data: {
      title: 'Main Page!'
    }
  },
  {path: 'news', loadChildren: '@news/news-page.module#NewsPageModule'},
  {path: 'login', loadChildren: '@login/login-page.module#LoginPageModule'},
  {path: 'add', loadChildren: '@add-news/add-news-page.module#AddNewsPageModule', canLoad: [AuthGuard], canActivate: [AuthGuard]},
  {path: 'registration', loadChildren: '@registration/registration-page.module#RegistrationPageModule'},
  {path: 'about', loadChildren: '@about/about-page.module#AboutPageModule'},
  {path: 'demo', loadChildren: '@demo/demo-page.module#DemoPageModule'},
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
