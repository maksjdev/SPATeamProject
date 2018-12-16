import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from '@main/main-page.component';
import {AuthGuard} from '@shared/guards/auth.guard';
import {AdminGuard} from '@shared/guards/admin.guard';
import {CONSTANTS} from '@shared/config/constants';
import {DeactivateGuard} from '@shared/guards/deactivate.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: CONSTANTS.APP.MAIN},
  {path: CONSTANTS.APP.MAIN, component: MainPageComponent, data: {
      title: 'Main Page!'
    }
  },
  {path: CONSTANTS.APP.NEWS, children: [
      {path: CONSTANTS.APP.CREATE, loadChildren: '@add-news/add-news-page.module#AddNewsPageModule',
        canLoad: [AuthGuard], canActivate: [AuthGuard]
      },
      {path: CONSTANTS.APP.EDIT+'/:id', loadChildren: '@add-news/add-news-page.module#AddNewsPageModule',
        canLoad: [AuthGuard], canActivate: [AuthGuard]
      },
      {path: ':id', pathMatch: 'full', loadChildren: '@news/news-page.module#NewsPageModule'},
    ]
  },

  {path: CONSTANTS.APP.LOGIN, loadChildren: '@login/login-page.module#LoginPageModule'},
  {path: CONSTANTS.APP.REGISTRATION, loadChildren: '@registration/registration-page.module#RegistrationPageModule'},
  {path: CONSTANTS.APP.ABOUT, loadChildren: '@about/about-page.module#AboutPageModule'},
  {path: CONSTANTS.APP.ADMIN, loadChildren: '@admin/admin-page.module#AdminPageModule',
    canLoad: [AdminGuard], canActivate: [AdminGuard]
  },
  {path: 'demo', loadChildren: '@demo/demo-page.module#DemoPageModule'},
  {path: '**',pathMatch: 'full', redirectTo: CONSTANTS.APP.MAIN},
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
