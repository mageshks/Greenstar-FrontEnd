import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { NbDialogModule,NbStepperModule,NbSpinnerModule } from '@nebular/theme';
import { SmartTableDatePickerComponent } from '../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components';
import { PerformanceDataService } from './data/performance-data.service';
import { PerformanceDataComponent } from './data/performance-data.component';
import { PerformanceStarComponent } from './star/performance-star.component';
import { PerformanceMetricsComponent } from './performance-metrics.component';
import { PerformanceDataUploadModalComponent } from './data/performance-data-upload.component.modal';
import { GreenstarComponent } from './star/greenstar/greenstar.component'
import { PerformanceDataSuccessModalComponent } from './data/performance-data-success.component.modal';
import { PerformanceStarService } from './star/performance-star.service';
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
    PerformanceStarService
  ]
})
export class PerformanceModule { }
