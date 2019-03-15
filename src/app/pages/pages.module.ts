import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { PerformanceModule } from './performance/performance.module';
import { AdminModule } from './admin/admin.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpConfigInterceptor } from '../interceptor/httpconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './util/auth-guard.service';

const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    SchoolModule,
    StudentModule,
    PerformanceModule,
    AdminModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PagesModule {
}
