import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { saveAs as tempSaveAs } from 'file-saver';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, ISearchPerformanceData } from './performance-data.interface';
import { PerformanceStaticData, } from './performance-data.constant';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';
import { PerformanceDataSuccessModalComponent } from './performance-data-success.component.modal';
import { PerformanceDataService } from './performance-data.service';
import { PerformanceStarService } from '../star/performance-star.service';
import { ValidatorUtil } from '../../util/validator-util';
import { ISchoolDetail, IClassSectionDetail } from '../star/performance-star.interface';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-data.component.scss'],
    templateUrl: './performance-data.component.html',
})
export class PerformanceDataComponent implements OnInit {

    public performanceSource: IPerformanceDataTable = {} as IPerformanceDataTable;

    public isShowPerformanceMetricTable: boolean = false;
    public isPerformanceChkboxEnabled: boolean = false;
    public isPerformanceEditEnabled: boolean = false;
    public isPerformanceAddEnabled: boolean = false;
    public isSearchDataNotValid: boolean = false;
    public isSpinner: boolean = false;
    public action: string = 'update';

    public schoolList: ISchoolDetail[];
    public classList: IClassSectionDetail[];

    public perfDataForm: FormGroup;

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private performanceDataService: PerformanceDataService,
        private performanceStarService: PerformanceStarService) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.loadSchoolDetails();
    }

    private initializeForm(): void {
        this.perfDataForm = this.formBuilder.group({
            schoolId: ['', Validators.required],
            classId: ['', Validators.required],
            month: ['', Validators.required],
            week: ['', Validators.required]
        });
    }

    public resetPerformanceSearch(): void {
        this.initializeForm();
    }

    public loadExistingPerformanceData(searchPerformanceData: ISearchPerformanceData): void {
        this.isSpinner = true;
        this.performanceDataService.getExistingPerformanceMetricDatas(searchPerformanceData).subscribe(
            (response) => {
                this.isSpinner = false;
                this.performanceSource = response.result;
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
                this.isSpinner = false;
                console.log("Http Server error", error);
            }
        );
    }

    public loadCreatePerformanceData(searchPerformanceData: ISearchPerformanceData): void {
        this.isSpinner = true;
        this.performanceDataService.getCreatePerformanceMetricDatas(searchPerformanceData).subscribe(
            (response) => {
                this.isSpinner = false;
                this.performanceSource = response.result;
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
                this.isSpinner = false;
                console.log("Http Server error", error);
            }
        );
    }

    private loadSchoolDetails(): void {
        this.isSpinner = true;
        this.performanceStarService.getSchools().subscribe(
            (response) => {
                this.schoolList = response;
                this.isSpinner = false;
            },
            error => {
                console.log("Http Server error", error);
                this.isSpinner = false;
            },

        );
    }

    private loadClassDetailsBySchool($event) : void {
        if (this.perfDataForm.getRawValue().schoolId != 0) {
            this.isSpinner = true;
            let schoolDetail: ISchoolDetail = {} as ISchoolDetail;
            schoolDetail.id = this.perfDataForm.getRawValue().schoolId;
            this.performanceStarService.getClassList(schoolDetail).subscribe(
                (response) => {
                    this.classList = response;
                    this.isSpinner = false;
                },
                error => {
                    console.log("Http Server error", error);
                    this.isSpinner = false;
                }
            );
        }
    }

    public openBulkUploadMmodal(): void {
        const activeModal = this.modalService.open(PerformanceDataUploadModalComponent, { size: 'lg', container: 'nb-layout' });
    }

    public downloadTemplate(): void {
        
        this.isSearchDataNotValid = false;
        if (this.perfDataForm.valid) {
            let searchPerformanceData: ISearchPerformanceData = {} as ISearchPerformanceData;
            searchPerformanceData.schoolId = this.perfDataForm.getRawValue().schoolId;
            searchPerformanceData.classId = this.perfDataForm.getRawValue().classId;
            searchPerformanceData.month = this.perfDataForm.getRawValue().month;
            searchPerformanceData.week = this.perfDataForm.getRawValue().week;

            let fileName = searchPerformanceData.schoolId
                + '_' + searchPerformanceData.classId 
                + '_' + searchPerformanceData.month
                + '_' + searchPerformanceData.week
                + '.xlsx';

            this.isSpinner = true;
            this.performanceDataService.getPerformanceDataTemplate(searchPerformanceData).subscribe(
                (response) => {
                    this.isSpinner = false;
                    var blob = new Blob([response], { type: 'application/octet-stream' });
                    tempSaveAs(blob, fileName);
                },
                error => {
                    this.isSpinner = false;
                    console.log("Http Server error", error);
                }
            );
        } else {
            ValidatorUtil.validateAllFormFields(this.perfDataForm);
            this.isSearchDataNotValid = true;
        }
    }

    public searchPerformanceData(): void {

        this.isSearchDataNotValid = false;
        if (this.perfDataForm.valid) {
            let searchPerformanceData: ISearchPerformanceData = {} as ISearchPerformanceData;
            searchPerformanceData.schoolId = this.perfDataForm.getRawValue().schoolId;
            searchPerformanceData.classId = this.perfDataForm.getRawValue().classId;
            searchPerformanceData.month = this.perfDataForm.getRawValue().month;
            searchPerformanceData.week = this.perfDataForm.getRawValue().week;

            this.loadExistingPerformanceData(searchPerformanceData);
        } else {
            ValidatorUtil.validateAllFormFields(this.perfDataForm);
            this.isSearchDataNotValid = true;
        }
    }

    public addPerformanceData(): void {
        this.action = 'create';
        this.isSearchDataNotValid = false;
        if (this.perfDataForm.valid) {
            let searchPerformanceData: ISearchPerformanceData = {} as ISearchPerformanceData;
            searchPerformanceData.schoolId = this.perfDataForm.getRawValue().schoolId;
            searchPerformanceData.classId = this.perfDataForm.getRawValue().classId;
            searchPerformanceData.month = this.perfDataForm.getRawValue().month;
            searchPerformanceData.week = this.perfDataForm.getRawValue().week;

            this.loadCreatePerformanceData(searchPerformanceData);
        } else {
            ValidatorUtil.validateAllFormFields(this.perfDataForm);
            this.isSearchDataNotValid = true;
        }
    }

    public editPerformanceData(): void {
        this.isPerformanceChkboxEnabled = true;
    }

    public submitPerformanceData(): void {

        this.performanceSource.userId = '534556';

        if (this.action === 'create') {
            this.isSpinner = true;
            this.performanceDataService.savePerformanceMetricDatas(this.performanceSource).subscribe(
                (response) => {
                    this.isSpinner = false;
                    if (response.status === 200 && response.message === 'SUCCESS') {
                        const activeModal = this.modalService.open(PerformanceDataSuccessModalComponent, { size: 'sm', container: 'nb-layout' });
                        activeModal.componentInstance.modalContent = 'Performance Meatric data saved successfully!..';
                    }
                },
                error => {
                    this.isSpinner = false;
                    console.log("Http Server error", error);
                }
            );
        } else {
            this.isSpinner = true;
            this.performanceDataService.updatePerformanceMetricDatas(this.performanceSource).subscribe(
                (response) => {
                    this.isSpinner = false;
                    if (response.status === 200 && response.message === 'SUCCESS') {
                        const activeModal = this.modalService.open(PerformanceDataSuccessModalComponent, { size: 'sm', container: 'nb-layout' });
                        activeModal.componentInstance.modalContent = 'Performance Meatric data saved successfully!..';
                    }
                },
                error => {
                    this.isSpinner = false;
                    console.log("Http Server error", error);
                }
            );
        }
        this.action = 'update';
        this.isPerformanceChkboxEnabled = false;
        this.isPerformanceAddEnabled = false;
    }

    public isFieldValid(field: string): boolean {
        this.isSearchDataNotValid = false;
        return ValidatorUtil.isFieldValid(this.perfDataForm, field);
    }

    public displayFieldCss(field: string): Object {
        return ValidatorUtil.displayFieldCss(this.perfDataForm, field);
    }

    public checkCellPerformanceDataStatus(event: any, performanceRow: IPerformanceRow, performanceDay: IPerformanceDay, performanceData: IPerformanceData): void {
        performanceData.value = event.target.checked;
    }

    public checkPerformanceParamWise(event: any, headerObj: IPerformanceHeader, subTitle: IPerformanceHeader): void {

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
