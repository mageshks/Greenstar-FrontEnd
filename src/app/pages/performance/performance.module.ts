import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { NbDialogModule,NbStepperModule,NbSpinnerModule } from '@nebular/theme';
import { PerformanceDataService } from './data/performance-data.service';
import { PerformanceMetricsService } from './metrics/performance-metrics.service';
import { PerformanceDataComponent } from './data/performance-data.component';
import { PerformanceStarComponent } from './star/performance-star.component';
import { PerformanceMetricsComponent } from './metrics/performance-metrics.component';
import { PerformanceDataUploadModalComponent } from './data/performance-data-upload.component.modal';
import { GreenstarComponent } from './star/greenstar/greenstar.component'
import { PerformanceDataSuccessModalComponent } from './data/performance-data-success.component.modal';
import { PerformanceStarService } from './star/performance-star.service';
import { PerformanceGenerateStarService } from './star/performance-star.generate.service';
import { CommonService } from '../common/common.service';
import { DashboardService } from '../dashboard/dashboard.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbStepperModule,
    NbSpinnerModule,
    NbDialogModule.forRoot()
  ],
  declarations: [
    PerformanceDataComponent,
    PerformanceMetricsComponent,
    PerformanceStarComponent,
    PerformanceDataUploadModalComponent,
    GreenstarComponent,
    PerformanceDataSuccessModalComponent 
  ],
  entryComponents: [
    PerformanceDataUploadModalComponent,
    GreenstarComponent,
    PerformanceDataSuccessModalComponent
  ], 
  providers: [
    PerformanceDataService,
    PerformanceMetricsService,
    PerformanceStarService,
    PerformanceGenerateStarService,
    CommonService,
    DashboardService
  ]
})
export class PerformanceModule { }
