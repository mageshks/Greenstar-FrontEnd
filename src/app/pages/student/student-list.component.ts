import { Component } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { SchoolMessageModalContent } from '../school/schoolMessageModalContent.component';
import { IClassSectionDetail, ISchoolDetail, IStudentDetail, IStudentSearchData } from './student.interface';
import { StudentBulkUploadModalComponent } from './student-bulk-upload.component.modal';
import { StudentService } from './student.service';

@Component({
  selector: 'ngx-student',
  styleUrls: ['./student.component.scss'],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {

  public schoolList: ISchoolDetail[];

  public isStudentAvailable: boolean = false;

  public isBulkUploadRequestNotValid: boolean = false;

  public studentSearchData: IStudentSearchData = new IStudentSearchData();

  // Contains list of class to display in dropdown
  public classSectionList: IClassSectionDetail[] = [];

  // Contains all details of class
  public classSectionDetail: IClassSectionDetail = new IClassSectionDetail();

  public loadingDropdown: boolean = false;

  public loadingStudents: boolean = false;

  public isSearchDataNotValid: boolean = false;

  // class table setting
  public studentSource: LocalDataSource = new LocalDataSource();
  public tableSetting: any = this.studentTableSetting();

  // Team table setting
  public teamNameTableSource: LocalDataSource = new LocalDataSource();
  public teamNameTableSetting: any = this.teamTableSettings();

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadSchoolDropDown();
    this.studentSearchData.schoolId = 0;
    this.studentSearchData.classId = 0;
    this.studentSource.load(this.classSectionDetail.studentList);
  }

  private loadSchoolDropDown() {
    this.studentService.getSchools().subscribe(
      (response) => {
        console.log(response);
        this.schoolList = response;
      },
      error => {
        console.log("Http Server error", error);
      },
    );
  }

  public onChangeClass() {
    this.isSearchDataNotValid = false;
  }

  public onChangeSchoolChange() {
    this.isSearchDataNotValid = false;
    this.isBulkUploadRequestNotValid = false;
    if (this.studentSearchData.schoolId == 0) {
      this.classSectionList = [];
      this.studentSearchData.classId = 0;
    } else {
      this.loadingDropdown = true;
      let schoolDetail: ISchoolDetail = new ISchoolDetail();
      schoolDetail.id = this.studentSearchData.schoolId;
      this.studentService.getClassList(schoolDetail).subscribe(
        (response) => {
          console.log(response);
          this.classSectionList = response;
          this.loadingDropdown = false;
        },
        error => {
          console.log("Http Server error", error);
        },
      );
    }
  }

  public onSearch() {
    if (this.studentSearchData.schoolId == 0 ||
      this.studentSearchData.classId == 0) {
      this.isSearchDataNotValid = true;
    } else {
      this.loadingStudents = true;
      let classDetail: IClassSectionDetail = new IClassSectionDetail();
      classDetail.id = this.studentSearchData.classId;
      classDetail.schoolId = this.studentSearchData.schoolId;
      this.studentService.getClassDetail(classDetail).subscribe(
        (response) => {
          console.log("classDetail ==> " + response);
          this.classSectionDetail = response;
          if (this.classSectionDetail.studentList.length == 0) {
            this.isStudentAvailable = false;
          } else {
            this.isStudentAvailable = true;
            this.studentSource.load(this.classSectionDetail.studentList);
            this.teamNameTableSource.load(this.classSectionDetail.schoolTeamList);
            this.loadingStudents = false;
          }
        },
        error => {
          console.log("Http Server error", error);
        },
      );
    }
  }

  public onStudentSubmit() {
    this.loadingStudents = true;
    //TODO: convert this to session variable
    this.classSectionDetail.userId="Magesh";
    this.classSectionDetail.schoolId=this.studentSearchData.schoolId;
    console.log("this.classSectionDetail.studentList" + JSON.stringify(this.classSectionDetail.studentList));
    this.studentService.saveOrUpdateStudent(this.classSectionDetail).subscribe(
      (response) => {
        console.log("classDetail ==> " + response);
        this.classSectionDetail = response;
        this.studentSource.load(this.classSectionDetail.studentList);
        this.teamNameTableSource.load(this.classSectionDetail.schoolTeamList);
        this.loadingStudents = false;
        this.openModal('Message', 'Students updated successfully!');
      },
      error => {
        console.log("Http Server error", error);
        this.openModal('Error Message', 'Error occured while updating students!');
      },
    );
  }

  public openBulkUploadDialog(): void {
    if(this.studentSearchData.schoolId == 0){
      this.isBulkUploadRequestNotValid = true;
    }else{
      const activeModal = this.modalService.open(StudentBulkUploadModalComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.schoolId = this.studentSearchData.schoolId;
      activeModal.componentInstance.classId = this.studentSearchData.classId;
    }
  }

  public downloadExcelExport(): void {

  }

  public onStudentCreate(event): void {
    console.log('create triggerred!');
    // If any of the feilds are left blank 
    if (event.newData.teamName == null || event.newData.teamName == '' ||
      event.newData.studentName == null || event.newData.studentName == '') {
      this.openModal('Validation Message', 'All fieilds are mandatory to add a Student!');
      event.confirm.reject();
    } else {
      this.classSectionDetail.studentList = event.source.data;
      event.confirm.resolve();
    }
  }

  public onStudentEdit(event): void {
    console.log('edit triggerred!');
    if (event.newData.teamName == null || event.newData.teamName == '' ||
      event.newData.studentName == null || event.newData.studentName == '') {
      this.openModal('Validation Message', 'All fieilds are mandatory to edit a Student!');
      event.confirm.reject();
    } else {
      this.classSectionDetail.studentList = event.source.data;
      event.confirm.resolve();
    }
  }

  public onStudentDeleteConfirm(event): void {
    console.log('delete triggerred!');
    if (window.confirm('Are you sure you want to delete? All the preformance data for the student will also get deleted!')) {
      this.classSectionDetail.studentList = event.source.data;
      for (let i = 0; i < this.classSectionDetail.studentList.length; i++) {
        let student = this.classSectionDetail.studentList[i];
        if (student.studentName === event.data.studentName
          && student.teamName === event.data.teamName) {
          this.classSectionDetail.studentList.splice(i, 1);
        }
      }
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  private studentTableSetting() {
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
      pager: { display: true, perPage: 10 },
      columns: {
        studentName: {
          title: 'Student Name',
          type: 'string'
        },
        teamName: {
          title: 'Team Name',
          type: 'string'
        }
      }
    };
    return settings;
  }

  private teamTableSettings() {
    let settings: any = {
      actions: { add: false, edit: false, delete: false },
      pager: { display: true, perPage: 10 },
      columns: {
        classSectionName: {
          title: 'Class',
          type: 'string'
        },
        teamName: {
          title: 'Team',
          type: 'string'
        },
        studentCount: {
          title: 'Student Count',
          type: 'string'
        }
      }
    };
    return settings;
  }

  private openModal(modalheadertext, modalmessage) {
    const modalRef = this.modalService.open(SchoolMessageModalContent);
    modalRef.componentInstance.modalmessage = modalmessage;
    modalRef.componentInstance.modalheadertext = modalheadertext;
  }

}
