import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { IStudentDetail } from './student.interface';
import { SchoolData } from '../school/school.data';
import { StudentBulkUploadModalComponent } from './student-bulk-upload.component.modal';
import { SchoolService } from '../school/school.service';
import { StudentService } from './student.service';

@Component({
  selector: 'ngx-student',
  styleUrls: ['./student.component.scss'],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {

  public studentDetail: IStudentDetail = {} as IStudentDetail;

  public studentList: IStudentDetail[] = [];

  // class table setting
  public studentSource: LocalDataSource = new LocalDataSource();
  public tableSetting: any = null;

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.tableSetting = this.getTableSettings();
    this.studentSource.load(this.studentList);
  }

  private getTableSettings(): void {

    let settings: any = {

      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true
      },
      actions: { position: 'right' },
      columns: {
        rollNo: {
          title: 'Roll No',
          type: 'string',
        },
        studentName: {
          title: 'Student Name',
          type: 'string',
        },
        school: {
          title: 'School',
          type: 'string',
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: SchoolData.getTempSchoolValue()
            },
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: SchoolData.getTempSchoolValue()
            },
          }
        },
        className: {
          title: 'Class',
          type: 'string',
          filter: {
            type: 'list',
            config: {
              selectText: 'Class...',
              list: SchoolData.getClassFieldValue()
            },
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: SchoolData.getClassFieldValue()
            },
          }
        },
        sectionName: {
          title: 'Section',
          type: 'string',
          filter: {
            type: 'list',
            config: {
              selectText: 'Section...',
              list: SchoolData.getSectionFieldValue()
            },
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: SchoolData.getSectionFieldValue()
            },
          }
        },
        team: {
          title: 'Team',
          type: 'string'
        }
      }
    };

    return settings;
  }

  public onPostCall(event): void {
    // todo: implement validation
    console.log(event);
    event.confirm.resolve();
  }

  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public openBulkUploadDialog(): void {
    const activeModal = this.modalService.open(StudentBulkUploadModalComponent, { size: 'lg', container: 'nb-layout' });
  }

  public downloadExcelExport(): void {
    
  }

}
