import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolComponent } from './school/school.component';
import { SchoolListComponent } from './school/school-list.component';
import { StudentListComponent } from './student/student-list.component';

export const PAGE_ROUTES: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'school', component: SchoolListComponent },
      { path: 'student', component: StudentListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(PAGE_ROUTES)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
