import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { PAGE_ROUTES } from './pages/pages-routing.module';

const parentRoutes: Routes = [
  {
    path: 'greenstarui',
    children: [      
      { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
      { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    ]
  },
  { path: '', redirectTo: 'greenstarui/login', pathMatch: 'full' },
];

const config: ExtraOptions = {
  //useHash: true,
  enableTracing: true
};

@NgModule({
  imports: [RouterModule.forRoot(parentRoutes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
