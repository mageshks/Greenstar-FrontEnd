import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SchoolData } from './school.data';
import { ISchoolDetail, IClass } from './school.interface';
import { OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { SchoolService } from './school.service';
import { IState } from '../common/common.interface';
import { SchoolMessageModalContent } from './schoolMessageModalContent.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartTableDatePickerComponent } from '../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components';

@Component({
  selector: 'nb-dialog',
  styleUrls: ['./school.component.scss'],
  templateUrl: './school.component.html'
})
export class SchoolComponent implements OnInit {

  public title: string;
  public action: string
  public schoolId: number;

  public schoolDetail: ISchoolDetail = new ISchoolDetail();

  public stateList: IState[];

  public districtList: string[];

  // class table setting
  public classDetail: LocalDataSource = new LocalDataSource();
  public classTableSetting: any;

  // performance param table setting
  public perfParamDynamicDetail: LocalDataSource = new LocalDataSource();
  public perfParamDynamicSetting: any;

  // school holiday table setting
  public schoolHolidayDetail: LocalDataSource = new LocalDataSource();
  public schoolHolidaySetting: any;

  // weekend working day table setting
  public schoolWeekendWorkDetail: LocalDataSource = new LocalDataSource();
  public schoolWeekendWorkSetting: any = SchoolData.getSchoolWeekendWorkingSetting(this.action);

  constructor(private commonService: CommonService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    console.log("this.action==> " + this.action);
    this.loadTableSettings();
    if (this.action === 'create') {
      this.schoolDetail = SchoolData.createSchoolDetailObject();
      this.perfParamDynamicDetail.load(this.schoolDetail.perfParamList);
    } else if (this.action === 'edit' || this.action === 'view') {
      // retrieve and load school data
      this.retrieveSchool();
    }
  }

  private loadTableSettings() {
    this.classTableSetting = SchoolData.getClassTableSetting(this.action);
    this.perfParamDynamicSetting = SchoolData.getPerfParamTableSetting(this.action);
    this.schoolHolidaySetting = SchoolData.getSchoolHolidaySetting(this.action);
    this.schoolWeekendWorkSetting = SchoolData.getSchoolWeekendWorkingSetting(this.action);
  }

  private retrieveSchool() {
    this.schoolService.retrieveSchool(this.schoolId).subscribe(
      (response) => {
        this.schoolDetail = response;
        // Load datasource with the data froms erver
        this.classDetail.load(this.schoolDetail.classList);
        this.perfParamDynamicDetail.load(this.schoolDetail.perfParamList);
        this.schoolHolidayDetail.load(this.schoolDetail.holidays);
        this.schoolWeekendWorkDetail.load(this.schoolDetail.weekendWorkingDays);
        //Load district list
        this.onStateChange();
        console.log("Retrieved school Detail Response ==> " + response);
      },
      error => {
        this.openModal('Error Occured', "Error occured while retrieving school");
        console.log("Http Server error", error);
      }
    );
  }

  // On change of state set corresponding district to the district dropdown
  public onStateChange() {
    console.log('this.schoolDetail.state' + this.schoolDetail.state);
    console.log('this.stateList' + this.stateList);
    if (this.schoolDetail.state == '--Select State--') {
      console.log('I am in no district');
      this.districtList = [];
    } else {
      this.stateList.forEach((state) => {
        if (state.stateName == this.schoolDetail.state) {
          this.districtList = state.districts;
          console.log('I am in  district');
        }
      });
    }
  }
  public onChangeTab(event) { }

  public onClassAdd(event): void {
    this.schoolDetail.classList.forEach((clazzDetail) => {
      // If school and section already exist then no need to add 
      if (clazzDetail.className == event.newData.className &&
        clazzDetail.sectionName == event.newData.sectionName) {
        this.openModal('Validation Message', 'Already class available with same name and section');
        event.confirm.reject();
      }
    });

    // If any of the feilds are left blank 
    if (event.newData.className == null || event.newData.className == '' ||
      event.newData.sectionName == null || event.newData.sectionName == '') {
      this.openModal('Validation Message', 'Both the fieilds are mandatory to add a class!');
      event.confirm.reject();
    } else {
      this.schoolDetail.classList = event.source.data;
      event.confirm.resolve();
      console.log(this.schoolDetail.classList);
    }
  }

  public onClassEdit(event): void {
    // If any of the feilds are left blank 
    if (event.newData.className == null || event.newData.className == '' ||
      event.newData.sectionName == null || event.newData.sectionName == '') {
      this.openModal('Validation Message', 'Both the fieilds are mandatory to edit a class!');
      event.confirm.reject();
    } else {
      this.schoolDetail.classList = event.source.data;
      event.confirm.resolve();
      console.log(this.schoolDetail.classList);
    }
  }

  public onClassDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete class? Performance data cannot be recovered')) {
      this.schoolDetail.classList = event.source.data;
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    console.log(this.schoolDetail.classList);
  }

  public onParameterEdit(event): void {
    // If any of the feilds are left blank 
    if (event.newData.paramTitle == null || event.newData.paramTitle == '' ||
      event.newData.paramDesc == null || event.newData.paramDesc == '') {
      this.openModal('Validation Message', 'All fieilds are mandatory to add a performance parameter!');
      event.confirm.reject();
    } else {
      this.schoolDetail.perfParamList = event.source.data;
      event.confirm.resolve();
    }
  }

  public onCreateForHoliday(event): void {
    // If any of the feilds are left blank 
    if (event.newData.fromDate == null || event.newData.fromDate == '' ||
      event.newData.toDate == null || event.newData.toDate == '' ||
      event.newData.description == null || event.newData.description == '') {
      this.openModal('Validation Message', 'All fieilds are mandatory to add a holiday!');
      event.confirm.reject();
    } else {
      this.schoolDetail.holidays = event.source.data;
      event.confirm.resolve();
    }
  }

  public onEditForHoliday(event): void {
    this.schoolDetail.holidays = event.source.data;
    event.confirm.resolve();
  }

  public onDeleteForHoliday(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.schoolDetail.holidays = event.source.data;
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onEditForWeekendWorking(event): void {
    console.log("OnEdit ==> " + event.source.data);
    this.schoolDetail.weekendWorkingDays = event.source.data;
    event.confirm.resolve();
  }

  public onCreateForWeekendWorking(event): void {
    console.log("OnCreate==> " + event.source.data);
    // If any of the feilds are left blank 
    if (event.newData.workingDate == null || event.newData.workingDate == '' ||
      event.newData.reason == null || event.newData.reason == '') {
      this.openModal('Validation Message', 'Both the fieilds are mandatory to add a weekend working day!');
      event.confirm.reject();
    } else {
      this.schoolDetail.weekendWorkingDays = event.source.data;
      event.confirm.resolve();
    }
  }

  public onDeleteForWeekendWorking(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log("OnDeleteAccept==> " + event.source.data);
      this.schoolDetail.weekendWorkingDays = event.source.data;
      event.confirm.resolve();
    } else {
      console.log("OnDeleteReject==> " + event.source.data);
      event.confirm.reject();
    }
  }

  public onSubmitChanges(): void {
    console.log(this.schoolDetail);
    let errorMessage = this.validateSubmit();
    console.log('errorMessage ==> ' + errorMessage);
    if (errorMessage != '') {
      this.openModal('Validation Error', errorMessage);
    } else {
      console.log("Validation Success ==> " + JSON.stringify(this.schoolDetail));
      this.schoolDetail.userId = "Magesh";
      this.schoolDetail.action = this.action;
      this.schoolService.submitSchool(this.schoolDetail).subscribe(
        (response) => {
          if(this.action == 'create'){
            this.openModal('Message', 'School information saved successfully');
          }else{
             //Edit flow
            this.openModal('Message', 'School information updated successfully');
          }
          this.schoolDetail = response;
        },
        error => {
          if(this.action == 'create'){
            this.openModal('Error Occured', "Error occured while saving school");
          }else{
            //Edit flow
            this.openModal('Error Occured', "Error occured while updating school");
          }
          console.log("Http Server error", error);
        }
      );
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  private openModal(modalheadertext, modalmessage) {
    const modalRef = this.modalService.open(SchoolMessageModalContent);
    modalRef.componentInstance.modalmessage = modalmessage;
    modalRef.componentInstance.modalheadertext = modalheadertext;
  }

  private validateSubmit() {
    let errorField: string[] = [];
    let errorString = '';
    if (this.schoolDetail.cityName == null || this.schoolDetail.cityName == '') {
      errorField.push("cityName");
    }
    if (this.schoolDetail.schoolName == null || this.schoolDetail.schoolName == '') {
      errorField.push("schoolName");
    }
    if (this.schoolDetail.district == null || this.schoolDetail.district == '--Select District--') {
      errorField.push("district");
    }
    if (this.schoolDetail.state == null || this.schoolDetail.state == '--Select State--') {
      errorField.push("state");
    }
    if (this.schoolDetail.address == null || this.schoolDetail.address == '') {
      errorField.push("address");
    }
    if (this.schoolDetail.classList.length == 0) {
      errorField.push("Class");
    }
    if (this.schoolDetail.holidays.length == 0) {
      errorField.push("Holidays");
    }
    if (errorField.length > 0) {
      errorString = "Please provide data for "
      errorField.forEach((errormsg) => {
        errorString = errorString + errormsg + ",";
      });
    }
    return errorString;
  }
}