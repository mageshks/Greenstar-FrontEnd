import { NgModule } from '@angular/core';


import { LoginComponent } from './login.component';
import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login.routing.module';
import { PagesLoginComponent } from './pages-login.component';
import { ThemeModule } from '../@theme/theme.module';

const LOGIN_PAGES_COMPONENTS = [
  PagesLoginComponent, LoginComponent
];

@NgModule({
  imports: [
    ThemeModule,
    LoginRoutingModule
  ],
  declarations: [
    ...LOGIN_PAGES_COMPONENTS,
  ]
})
export class LoginModule { }
