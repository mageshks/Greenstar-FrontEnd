import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SchoolListComponent } from './school-list.component';
import { SchoolComponent } from './school.component';
import { NbDialogModule } from '@nebular/theme';

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
    SchoolComponent
  ],
})
export class SchoolModule { }
