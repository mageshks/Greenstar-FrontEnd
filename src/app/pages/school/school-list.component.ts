import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { SchoolComponent } from './school.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-school',
  styleUrls: ['./school.component.scss'],
  templateUrl: './school-list.component.html',
})
export class SchoolListComponent {

  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(SchoolComponent, { 
      context: {
        title: 'Add School & Class',
      },
    });
  }

}
