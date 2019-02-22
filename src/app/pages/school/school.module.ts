import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SchoolListComponent } from './school-list.component';
import { SchoolComponent } from './school.component';
import { NbDialogModule } from '@nebular/theme';
import { SmartTableDatePickerComponent } from '../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components';
import { SchoolService } from './school.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot()
  ],
  declarations: [
    SchoolListComponent,
    SchoolComponent
  ],
  entryComponents: [
    SchoolComponent,
    SmartTableDatePickerComponent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule { }
