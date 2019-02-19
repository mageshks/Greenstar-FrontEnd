import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { StudentListComponent } from './student-list.component';
import { NbDialogModule } from '@nebular/theme';
import { SmartTableDatePickerComponent } from '../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components';
import { StudentBulkUploadModalComponent } from './student-bulk-upload.component.modal';
import { StudentService } from './student.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot()
  ],
  declarations: [
    StudentListComponent,
    StudentBulkUploadModalComponent
  ],
  entryComponents: [
    StudentBulkUploadModalComponent
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
