import { OnInit, Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from './performance.service';
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, ISearchPerformanceData } from './performance-data.interface';
import { PerformanceStaticData, } from './performance-data.constant';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidatorUtil } from '../util/validator-util';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-data.component.scss'],
    templateUrl: './performance-data.component.html',
})
export class PerformanceDataComponent implements OnInit {

    public performanceSource: IPerformanceDataTable = {} as IPerformanceDataTable;

    public isShowPerformanceMetricTable = false;
    public isPerformanceChkboxEnabled = false;
    public isPerformanceEditEnabled = false;
    public isPerformanceAddEnabled = false;

    perfDataForm: FormGroup;

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private performanceService: PerformanceService) {
    }

    ngOnInit(): void {
        this.perfDataForm = this.formBuilder.group({
            schoolId: ['1', Validators.required],
            className: ['First', Validators.required],
            sectionName: ['A', Validators.required],
            month: ['2', Validators.required],
            week: ['', Validators.required]
        });
    }


    public loadExistingPerformanceData(searchPerformanceData: ISearchPerformanceData): void {

        this.performanceService.getExistingPerformanceMetricDatas(searchPerformanceData).subscribe(
            (response) => {
                console.log(response);
                this.performanceSource = response;
                if (this.performanceSource != null) {
                    this.isShowPerformanceMetricTable = true;
                    this.isPerformanceEditEnabled = true;
                    this.isPerformanceChkboxEnabled = false;
                    this.isPerformanceAddEnabled = false;
                    if (this.performanceSource.performanceRows.length <= 0) {
                        this.isPerformanceAddEnabled = true;
                        this.isPerformanceChkboxEnabled = false;
                        this.isPerformanceEditEnabled = false;
                    }
                } else {
                    this.isShowPerformanceMetricTable = false;
                    this.isPerformanceChkboxEnabled = false;
                    this.isPerformanceEditEnabled = false;
                    this.isPerformanceAddEnabled = false;
                }
            },
            error => {
                console.log("Http Server error", error);
            }
        );
    }

    public loadCreatePerformanceData(searchPerformanceData: ISearchPerformanceData): void {

        this.performanceService.getCreatePerformanceMetricDatas(searchPerformanceData).subscribe(
            (response) => {
                console.log(response);
                this.performanceSource = response;
                if (this.performanceSource != null) {
                    this.isShowPerformanceMetricTable = true;
                    this.isPerformanceEditEnabled = true;
                    this.isPerformanceChkboxEnabled = false;
                    this.isPerformanceAddEnabled = false;
                    if (this.performanceSource.performanceRows.length <= 0) {
                        this.isPerformanceAddEnabled = true;
                        this.isPerformanceChkboxEnabled = false;
                        this.isPerformanceEditEnabled = false;
                    }
                } else {
                    this.isShowPerformanceMetricTable = false;
                    this.isPerformanceChkboxEnabled = false;
                    this.isPerformanceEditEnabled = false;
                    this.isPerformanceAddEnabled = false;
                }
            },
            error => {
                console.log("Http Server error", error);
            }
        );
    }

    public openBulkUploadMmodal(): void {
        const activeModal = this.modalService.open(PerformanceDataUploadModalComponent, { size: 'lg', container: 'nb-layout' });
    }

    public searchPerformanceData(): void {

        if (this.perfDataForm.valid) {
            let searchPerformanceData: ISearchPerformanceData = {} as ISearchPerformanceData;
            searchPerformanceData.schoolId = this.perfDataForm.getRawValue().schoolId;
            searchPerformanceData.className = this.perfDataForm.getRawValue().className;
            searchPerformanceData.sectionName = this.perfDataForm.getRawValue().sectionName;
            searchPerformanceData.month = this.perfDataForm.getRawValue().month;
            searchPerformanceData.week = this.perfDataForm.getRawValue().week;

            this.loadExistingPerformanceData(searchPerformanceData);
        } else {
            ValidatorUtil.validateAllFormFields(this.perfDataForm);
            alert("Please Enter all data");
        }
    }

    public addPerformanceData(): void {
        if (this.perfDataForm.valid) {
            let searchPerformanceData: ISearchPerformanceData = {} as ISearchPerformanceData;
            searchPerformanceData.schoolId = this.perfDataForm.getRawValue().schoolId;
            searchPerformanceData.className = this.perfDataForm.getRawValue().className;
            searchPerformanceData.sectionName = this.perfDataForm.getRawValue().sectionName;
            searchPerformanceData.month = this.perfDataForm.getRawValue().month;
            searchPerformanceData.week = this.perfDataForm.getRawValue().week;

            this.loadCreatePerformanceData(searchPerformanceData);
        } else {
            ValidatorUtil.validateAllFormFields(this.perfDataForm);
            alert("Please Enter all data");
        }
    }

    public editPerformanceData(): void {
        this.isPerformanceChkboxEnabled = true;
    }

    public submitPerformanceData(): void {

        this.performanceSource.userId = '534556';

        if (this.isPerformanceAddEnabled) {
            this.performanceService.savePerformanceMetricDatas(this.performanceSource).subscribe(
                (response) => {
                    console.log(response);
                    this.performanceSource = response;
                },
                error => {
                    console.log("Http Server error", error);
                }
            );
        } else {
            this.performanceService.updatePerformanceMetricDatas(this.performanceSource).subscribe(
                (response) => {
                    console.log(response);
                    this.performanceSource = response;
                },
                error => {
                    console.log("Http Server error", error);
                }
            );
        }

        this.isPerformanceChkboxEnabled = false;
        this.isPerformanceAddEnabled = false;
    }

    public isFieldValid(field: string): boolean {
        return ValidatorUtil.isFieldValid(this.perfDataForm, field);
    }

    public displayFieldCss(field: string): Object {
        return ValidatorUtil.displayFieldCss(this.perfDataForm, field);
    }

    public checkCellPerformanceDataStatus(event: any, performanceRow: IPerformanceRow, performanceDay: IPerformanceDay, performanceData: IPerformanceData): void {

        console.log(performanceRow);
        console.log(performanceDay);
        console.log(performanceData);

        performanceData.value = event.target.checked;
    }

    public checkPerformanceParamWise(event: any, headerObj: IPerformanceHeader, subTitle: IPerformanceHeader): void {
        console.log("Header Event -> " + event.target.checked);
        console.log(headerObj);
        console.log(subTitle);

        this.performanceSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceDays.forEach(
                    (performanceDay) => {
                        if (performanceDay.dateValue === headerObj.title) {
                            performanceDay.performanceData.forEach(
                                (performanceData) => {
                                    if (performanceData.key === subTitle.title) {
                                        performanceData.value = event.target.checked;
                                    }
                                });
                        }
                    });
            });

    }

    public checkPerformanceDayWise(event: any, headerObj: IPerformanceHeader): void {
        console.log("Header Day Event -> " + event.target.checked);
        console.log(headerObj);

        this.performanceSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceDays.forEach(
                    (performanceDay) => {
                        if (performanceDay.dateValue === headerObj.title) {
                            performanceDay.performanceData.forEach(
                                (performanceData) => {
                                    performanceData.value = event.target.checked;
                                });
                        }
                    });
            });

        // check header checkbox
        this.performanceSource.headers.forEach(
            (performanceHeader) => {
                if (performanceHeader.title === headerObj.title) {
                    performanceHeader.subTitleList.forEach(
                        (performanceHeader) => {
                            //if (performanceHeader.title === headerObj.title) {
                            performanceHeader.checkValue = event.target.checked;
                            //}
                        });
                }
            });

    }

    public checkAllPerformance(event: any): void {

        console.log("Table Level Event -> " + event.target.checked);

        // check all performance parameters
        this.performanceSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceDays.forEach(
                    (performanceDay) => {
                        performanceDay.performanceData.forEach(
                            (performanceData) => {
                                performanceData.value = event.target.checked;
                            });
                    });
            });

        // check header checkbox
        this.performanceSource.headers.forEach(
            (performanceHeader) => {
                performanceHeader.checkValue = event.target.checked;
                performanceHeader.subTitleList.forEach(
                    (performanceHeader) => {
                        performanceHeader.checkValue = event.target.checked;
                    });
            });

    }


}
