import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SchoolData } from './school.data';
import { ISchoolDetail, IClass } from './school.interface';
import { OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { IState } from '../common/common.interface';
import { ShoolMessageModalContent } from './shoolMessageModalContent.component';
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

  public schoolDetail: ISchoolDetail;

  public stateList: IState[];

  public districtList: string[];

  // class table setting
  public classDetail: LocalDataSource = new LocalDataSource();
  public classTableSetting: any = SchoolData.getClassTableSetting();

  // performance param table setting
  public perfParamDetail: LocalDataSource = new LocalDataSource();
  public perfParamSetting: any = SchoolData.getPerfParamTableSettingWithNoAction();

  // performance param dynamic table setting
  public perfParamDynamicDetail: LocalDataSource = new LocalDataSource();
  public perfParamDynamicSetting: any = SchoolData.getPerfParamTableSetting();

  // school holiday table setting
  public schoolHolidayDetail: LocalDataSource = new LocalDataSource();
  public schoolHolidaySetting: any = SchoolData.getSchoolHolidaySetting();

  // weekend working day table setting
  public schoolWeekendWorkDetail: LocalDataSource = new LocalDataSource();
  public schoolWeekendWorkSetting: any = SchoolData.getSchoolWeekendWorkingSetting();

  constructor(private commonService: CommonService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {
    if (this.action === 'create') {
      this.schoolDetail = SchoolData.createSchoolDetailObject();
      this.loadStateData();
    } else if (this.action === 'edit') {
      this.schoolDetail = SchoolData.getTempSchoolDetails();
      this.loadStateData();
    } else {
      console.log('No Matches Found For Action');
    }

    this.schoolHolidayDetail.load(this.schoolDetail.holidays);
    this.schoolWeekendWorkDetail.load(this.schoolDetail.weekendWorkingDayes);
  }

  private loadStateData() {
    this.commonService.getStates().subscribe(
      (response) => {
        this.stateList = response;
      },
      error => {
        console.log("Http Server error", error);
      }
    );
  }


  // On change of state set corresponding district to the district dropdown
  public onStateChange() {
    if (this.schoolDetail.state == '--Select State--') {
      this.districtList = [];
    } else {
      this.stateList.forEach((state) => {
        if (state.stateName == this.schoolDetail.state) {
          this.districtList = state.districts;
        }
      });
    }
  }

  public onChangeTab(event) {
    if (event.tabTitle === 'Class') {
      this.classDetail.load(this.schoolDetail.classList);
    } if (event.tabTitle === 'Performance Parameter') {
      if (this.schoolDetail.perfParamType === SchoolData.PERF_PARAM_DEFAULT) {
        this.schoolDetail.perfParamList = SchoolData.getDefaultPerfParamDetail();
        this.perfParamSetting = SchoolData.getPerfParamTableSettingWithNoAction();
        this.perfParamDetail.load(this.schoolDetail.perfParamList);
      } else if (this.schoolDetail.perfParamType === SchoolData.PERF_PARAM_CUSTOM) {
        this.perfParamDynamicSetting = SchoolData.getPerfParamTableSetting();
        this.perfParamDynamicDetail.load(this.schoolDetail.perfParamList);
      } else {
        console.log('No matches found for performance parameter type');
      }
    } else {
      console.log('No matches found')
    }

  }

  public onChangePerfParamType(event): void {

    if (this.schoolDetail.perfParamType === SchoolData.PERF_PARAM_DEFAULT) {
      this.perfParamSetting = SchoolData.getPerfParamTableSettingWithNoAction();
      this.perfParamDetail.load(SchoolData.getDefaultPerfParamDetail());
    } else if (this.schoolDetail.perfParamType === SchoolData.PERF_PARAM_CUSTOM) {
      this.perfParamDynamicSetting = SchoolData.getPerfParamTableSetting();
      this.perfParamDynamicDetail.load(this.schoolDetail.perfParamList);
    } else {
      console.log('No matches found for performance parameter type');
    }
  }

  public onPostCallForClass(event): void {
    // todo: implement validation
    console.log(event);
    event.confirm.resolve();
  }

  public onClassAdd(event): void {
    // If school and section already exist then no need to add 
    this.schoolDetail.classList.forEach((clazzDetail) => {
      if (clazzDetail.className == event.newData.className &&
        clazzDetail.sectionName == event.newData.sectionName) {
        const modalRef = this.modalService.open(ShoolMessageModalContent);
        modalRef.componentInstance.modalmessage = 'Already class available with same name and section';
        modalRef.componentInstance.modalheadertext = 'Error';
        event.confirm.reject();
      }
    });
    this.schoolDetail.classList = event.source.data;
    event.confirm.resolve();
  }

  public onDeleteConfirmForClass(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onPostCallForPerfParam(event): void {
    // todo: implement validation
    console.log(event);
    event.confirm.resolve();
  }

  public onDeleteConfirmForPerfParam(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onPostCallForHoliday(event): void {
    // todo: implement validation
    console.log(event);
    event.confirm.resolve();
  }

  public onDeleteConfirmForHoliday(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onPostCallForWeekendWorking(event): void {
    // todo: implement validation
    console.log(event);
    event.confirm.resolve();
  }

  public onDeleteConfirmForWeekendWorking(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onSubmitChanges(): void {
    console.log(this.schoolDetail);
    alert('Submitted Successfully');
  }

  closeModal() {
    this.activeModal.close();
  }

}
