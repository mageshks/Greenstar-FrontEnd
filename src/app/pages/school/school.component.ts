import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SchoolData } from './school.data';
import { ISchoolDetail } from './school.interface';
import { OnInit } from '@angular/core';

@Component({
  selector: 'nb-dialog',
  styleUrls: ['./school.component.scss'],
  templateUrl: './school.component.html',
})
export class SchoolComponent implements OnInit {

  @Input()
  public title: string;

  public schoolDetail: ISchoolDetail;

  public classDetail: LocalDataSource = new LocalDataSource();
  public classTableSetting: any = SchoolData.getClassTableSetting();

  public perfParamDetail: LocalDataSource = new LocalDataSource();
  public perfParamSetting: any = SchoolData.getPerfParamTableSettingWithNoAction();

  public perfParamDynamicDetail: LocalDataSource = new LocalDataSource();
  public perfParamDynamicSetting: any = SchoolData.getPerfParamTableSetting();

  constructor(protected nbDialogRef: NbDialogRef<SchoolComponent>) {
  }

  ngOnInit(): void {
    this.schoolDetail = SchoolData.getSchoolDetails();
  }

  public onChangeTab(event) {
    if (event.tabTitle === 'Class') {
      //this.classTableSetting = SchoolData.getClassTableInfo();
      this.classDetail.load(this.schoolDetail.classList);
    } if (event.tabTitle === 'Performance Parameter') {
      if (this.schoolDetail.perfParamType === SchoolData.PERF_PARAM_DEFAULT) {
        this.perfParamSetting = SchoolData.getPerfParamTableSettingWithNoAction();
        this.perfParamDetail.load(SchoolData.getDefaultPerfParamDetail());
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

  public onDeleteConfirmForClass(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onDeleteConfirmForPerfParam(event): void {
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

  public dismiss() {
    this.nbDialogRef.close();
  }
}
