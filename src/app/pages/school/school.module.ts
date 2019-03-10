import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SchoolListComponent } from './school-list.component';
import { SchoolComponent } from './school.component';
import { NbDialogModule } from '@nebular/theme';
import { ShoolMessageModalContent } from './shoolMessageModalContent.component';
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
    SchoolComponent,
    ShoolMessageModalContent
  ],
  entryComponents: [
    SchoolComponent,
    SmartTableDatePickerComponent,
    ShoolMessageModalContent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule { }
