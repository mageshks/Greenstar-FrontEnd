import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { SchoolComponent } from './school.component';
import { NbDialogService } from '@nebular/theme';
import { ISchoolDetail,ISchoolSearchData } from './school.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-school',
  styleUrls: ['./school.component.scss'],
  templateUrl: './school-list.component.html',
})
export class SchoolListComponent {

  public schoolSearchData: ISchoolSearchData = {} as ISchoolSearchData;

  constructor(private modalService: NgbModal) {
  }

  public createSchool(): void {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Add School & Class';
    activeModal.componentInstance.action = 'create';
  }

  public editSchool(schoolDetail: ISchoolDetail): void {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Edit School & Class';
    activeModal.componentInstance.action = 'edit';
    activeModal.componentInstance.schoolId = schoolDetail.id;
  }

}
