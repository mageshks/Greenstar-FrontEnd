import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { NbDialogModule,NbStepperModule,NbSpinnerModule } from '@nebular/theme';
import { SmartTableDatePickerComponent } from '../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components';
import { PerformanceService } from './performance.service';
import { PerformanceDataComponent } from './performance-data.component';
import { PerformanceStarComponent } from './star/performance-star.component';
import { PerformanceMetricsComponent } from './performance-metrics.component';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';
import { GreenstarComponent } from './star/greenstar/greenstar.component'
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
    GreenstarComponent
  ],
  entryComponents: [
    PerformanceDataUploadModalComponent,GreenstarComponent
  ],
  providers: [
    PerformanceService
  ]
})
export class PerformanceModule { }
