import { NgModule } from '@angular/core';
import { NbDialogModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableDatePickerComponent } from '../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components';
import { ThemeModule } from '../../@theme/theme.module';
import { SchoolListComponent } from './school-list.component';
import { SchoolComponent } from './school.component';
import { SchoolService } from './school.service';
import { SchoolMessageModalContent } from './schoolMessageModalContent.component';



@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot()
  ],
  declarations: [
    SchoolListComponent,
    SchoolComponent,
    SchoolMessageModalContent
  ],
  entryComponents: [
    SchoolComponent,
    SmartTableDatePickerComponent,
    SchoolMessageModalContent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule { }
