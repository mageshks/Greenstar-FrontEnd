import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PagesLoginComponent } from './pages-login.component';

const routes: Routes = [
  {
    path: '', component: PagesLoginComponent,
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login', component: LoginComponent },
        { path: 'pages/login', component: LoginComponent }        
      ],
  },  
  
  {
    path: 'mainmod', component: PagesComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent }
      ],
  } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
