import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceMetricsService } from './performance-metrics.service';
import { IStudentDetail } from '../../student/student.interface';
import { SchoolData } from '../../school/school.data';
import { StudentBulkUploadModalComponent } from '../../student/student-bulk-upload.component.modal';
import { SchoolService } from '../../school/school.service';
import { StudentService } from '../../student/student.service';
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, IPerformanceMetricsDataTable, IClassWiseMetricsDataTable, ITeamWiseMetricsDataTable, IEncouragingMetricsDataTable, ISearchPerformanceMetrics } from './performance-metrics.interface';
import { PerformanceStaticData } from './performance-metrics.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISchoolDetail, IClassSectionDetail } from '../star/performance-star.interface';
import { ValidatorUtil } from '../../util/validator-util';
import { PerformanceStarService } from '../star/performance-star.service';
import { PerformanceDataService } from '../data/performance-data.service';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-metrics.component.scss'],
    templateUrl: './performance-metrics.component.html'
})
export class PerformanceMetricsComponent implements OnInit {

    public performanceMetricsSource: IPerformanceMetricsDataTable = {} as IPerformanceMetricsDataTable;
    public classWiseMetricsSource: IClassWiseMetricsDataTable = {} as IClassWiseMetricsDataTable;
    public teamWiseMetricsSource: ITeamWiseMetricsDataTable = {} as ITeamWiseMetricsDataTable;
    public encouragingMetricsSource: IEncouragingMetricsDataTable = {} as IEncouragingMetricsDataTable;

    public isSearchDataNotValid: boolean = false;
    public isClasswiseSearchDataNotValid: boolean = false;
    public isTeamwiseSearchDataNotValid: boolean = false;
    public isSpinner: boolean = false;
    public searchDataErrorMsg: string = '';

    public perfMetricsForm: FormGroup;
    public classPerfMetricsForm: FormGroup;
    public teamPerfMetricsForm: FormGroup;
    public encouragingPerfMetricsForm: FormGroup;

    public schoolList: ISchoolDetail[];
    public classList: IClassSectionDetail[];
    public distinctClassList: Set<string>;
    public weekDays = new Map<String, String>();
    public monthList: Array<any>;

    public selectedClass: IClassSectionDetail;
    public selectedClassName: string;
    public selectedMonth1: string;
    public selectedMonth2: string;

    constructor(
        private formBuilder: FormBuilder,
        private classFormBuilder: FormBuilder,
        private teamFormBuilder: FormBuilder,
        private encouragingFormBuilder: FormBuilder,
        private performanceMetricsService: PerformanceMetricsService,
        private performanceStarService: PerformanceStarService) {
    }

    ngOnInit(): void {
        this.monthList = PerformanceStaticData.monthList;
        this.distinctClassList = new Set<string>();
        //this.performanceMetricsSource = PerformanceStaticData.getPerformanceMetricsTableContent();
        this.initializeForm();
        this.initializeClasswiseForm();
        this.initializeTeamwiseForm();
        this.initializeEncouragingForm();
        this.loadSchoolDetails();
    }

    private initializeForm(): void {
        this.perfMetricsForm = this.formBuilder.group({
            schoolId: ['', Validators.required],
            classId: ['', Validators.required],
            month: ['', Validators.required],
            week: ['', Validators.required]
        });
    }

    private initializeClasswiseForm(): void {
        this.classPerfMetricsForm = this.classFormBuilder.group({
            schoolId: ['', Validators.required],
            classId: ['', Validators.required]
        });
    }

    private initializeTeamwiseForm(): void {
        this.teamPerfMetricsForm = this.teamFormBuilder.group({
            schoolId: ['', Validators.required],
            classId: ['', Validators.required]
        });
    }

    private initializeEncouragingForm(): void{
        this.encouragingPerfMetricsForm = this.encouragingFormBuilder.group({
            schoolId: ['',Validators.required],
            classId: [''],
            month1: ['', Validators.required],
            month2: ['', Validators.required]
        })
    }

    public resetPerformanceSearch(): void {
        this.initializeForm();
    }
    public resetClasswisePerformanceSearch(): void {
        this.initializeClasswiseForm();
    }
    public resetTeamwisePerformanceSearch(): void {
        this.initializeTeamwiseForm();
    }

    public isFieldValid(field: string): boolean {
        this.isSearchDataNotValid = false;
        return ValidatorUtil.isFieldValid(this.perfMetricsForm, field);
    }

    public displayFieldCss(field: string): Object {
        return ValidatorUtil.displayFieldCss(this.perfMetricsForm, field);
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

    public loadIndividualClassDetailsBySchool($event) : void {
        if (this.perfMetricsForm.getRawValue().schoolId != 0) {
            this.isSpinner = true;
            let schoolDetail: ISchoolDetail = {} as ISchoolDetail;
            schoolDetail.id = this.perfMetricsForm.getRawValue().schoolId;
            this.loadClassDetailsBySchoolId(schoolDetail);
        }
    }

    public loadClasswiseClassDetailsBySchool($event) : void {
        if (this.classPerfMetricsForm.getRawValue().schoolId != 0) {
            this.isSpinner = true;
            let schoolDetail: ISchoolDetail = {} as ISchoolDetail;
            schoolDetail.id = this.classPerfMetricsForm.getRawValue().schoolId;
            this.loadClassDetailsBySchoolId(schoolDetail);
        }
    }

    public loadTeamwiseClassDetailsBySchool($event) : void {
        if (this.teamPerfMetricsForm.getRawValue().schoolId != 0) {
            this.isSpinner = true;
            let schoolDetail: ISchoolDetail = {} as ISchoolDetail;
            schoolDetail.id = this.teamPerfMetricsForm.getRawValue().schoolId;
            this.loadClassDetailsBySchoolId(schoolDetail);
        }
    }


    public loadEncouragingClassDetailsBySchool($event) : void {
        if (this.encouragingPerfMetricsForm.getRawValue().schoolId != 0) {
            this.isSpinner = true;
            let schoolDetail: ISchoolDetail = {} as ISchoolDetail;
            schoolDetail.id = this.encouragingPerfMetricsForm.getRawValue().schoolId;
            this.loadClassDetailsBySchoolId(schoolDetail);
        }
    }

    private loadClassDetailsBySchoolId(schoolDetail: ISchoolDetail) {
        this.performanceStarService.getClassList(schoolDetail).subscribe((response) => {
            this.classList = response;
            this.classList.forEach(element => {
                this.distinctClassList.add(element.className);
            });
            this.isSpinner = false;
        }, error => {
            console.log("Http Server error", error);
            this.isSpinner = false;
        });
    }

    public viewIndividualPerformanceMetrics(): void {

        this.isSearchDataNotValid = false;
        if (this.perfMetricsForm.valid) {
            let searchPerformanceMetrics: ISearchPerformanceMetrics = {} as ISearchPerformanceMetrics;
            searchPerformanceMetrics.schoolId = this.perfMetricsForm.getRawValue().schoolId;
            searchPerformanceMetrics.classId = this.perfMetricsForm.getRawValue().classId;
            searchPerformanceMetrics.month = this.perfMetricsForm.getRawValue().month;
            searchPerformanceMetrics.week = this.perfMetricsForm.getRawValue().week;

            this.loadIndividualPerformanceMetrics(searchPerformanceMetrics);
        } else {
            ValidatorUtil.validateAllFormFields(this.perfMetricsForm);
            this.isSearchDataNotValid = true;
        }
    }

    public loadIndividualPerformanceMetrics(searchPerformanceMetrics: ISearchPerformanceMetrics): void {
        this.isSpinner = true;
        this.performanceMetricsService.getIndividualPerformanceMetrics(searchPerformanceMetrics).subscribe(
            (response) => {
                this.isSpinner = false;
                this.performanceMetricsSource = response.result;
            },
            error => {
                this.isSpinner = false;
                console.log("Http Server error", error);
            }
        );
    }

    public viewClasswisePerformanceMetrics(): void {

        this.isClasswiseSearchDataNotValid = false;
        if (this.classPerfMetricsForm.valid) {
            let searchPerformanceMetrics: ISearchPerformanceMetrics = {} as ISearchPerformanceMetrics;
            searchPerformanceMetrics.schoolId = this.classPerfMetricsForm.getRawValue().schoolId;
            //searchPerformanceMetrics.classId = this.classPerfMetricsForm.getRawValue().classId;
            searchPerformanceMetrics.className = this.selectedClassName;
            this.loadClasswisePerformanceMetrics(searchPerformanceMetrics);
        } else {
            ValidatorUtil.validateAllFormFields(this.classPerfMetricsForm);
            this.isClasswiseSearchDataNotValid = true;
        }
    }

    public loadClasswisePerformanceMetrics(searchPerformanceMetrics: ISearchPerformanceMetrics): void {
        this.isSpinner = true;
        this.performanceMetricsService.getClasswisePerformanceMetrics(searchPerformanceMetrics).subscribe(
            (response) => {
                this.isSpinner = false;
                this.classWiseMetricsSource = response.result;
            },
            error => {
                this.isSpinner = false;
                console.log("Http Server error", error);
            }
        );
    }

    public viewTeamwisePerformanceMetrics(): void {

        this.isTeamwiseSearchDataNotValid = false;
        if (this.teamPerfMetricsForm.valid) {
            let searchPerformanceMetrics: ISearchPerformanceMetrics = {} as ISearchPerformanceMetrics;
            searchPerformanceMetrics.schoolId = this.teamPerfMetricsForm.getRawValue().schoolId;
            //searchPerformanceMetrics.classId = this.teamPerfMetricsForm.getRawValue().classId;
            searchPerformanceMetrics.className = this.selectedClassName;
            this.loadTeamwisePerformanceMetrics(searchPerformanceMetrics);
        } else {
            ValidatorUtil.validateAllFormFields(this.teamPerfMetricsForm);
            this.isTeamwiseSearchDataNotValid = true;
        }
    }

    public loadTeamwisePerformanceMetrics(searchPerformanceMetrics: ISearchPerformanceMetrics): void {
        this.isSpinner = true;
        this.performanceMetricsService.getTeamwisePerformanceMetrics(searchPerformanceMetrics).subscribe(
            (response) => {
                this.isSpinner = false;
                this.teamWiseMetricsSource = response.result;
            },
            error => {
                this.isSpinner = false;
                console.log("Http Server error", error);
            }
        );
    }

    public viewEncouragingPerformanceMetrics(): void {

        this.isTeamwiseSearchDataNotValid = false;
        if (this.encouragingPerfMetricsForm.valid) {
            let searchPerformanceMetrics: ISearchPerformanceMetrics = {} as ISearchPerformanceMetrics;
            searchPerformanceMetrics.schoolId = this.encouragingPerfMetricsForm.getRawValue().schoolId;
            //searchPerformanceMetrics.classId = this.teamPerfMetricsForm.getRawValue().classId;
            searchPerformanceMetrics.className = this.selectedClassName;
            searchPerformanceMetrics.month1 = this.selectedMonth1;
            searchPerformanceMetrics.month2 = this.selectedMonth2;

            this.loadEncouragingPerformanceMetrics(searchPerformanceMetrics);
        } else {
            ValidatorUtil.validateAllFormFields(this.teamPerfMetricsForm);
            this.isTeamwiseSearchDataNotValid = true;
        }
    }

    public loadEncouragingPerformanceMetrics(searchPerformanceMetrics: ISearchPerformanceMetrics): void {
        this.isSpinner = true;
        this.performanceMetricsService.getEncouragingPerformanceMetrics(searchPerformanceMetrics).subscribe(
            (response) => {
                this.isSpinner = false;
                this.encouragingMetricsSource.metrics = response.result;
            },
            error => {
                this.isSpinner = false;
                console.log("Http Server error", error);
            }
        );
    }

    private getSearchParamObject(): ISearchPerformanceMetrics {

        let searchPerformanceData: ISearchPerformanceMetrics = {} as ISearchPerformanceMetrics;
        searchPerformanceData.schoolId = this.perfMetricsForm.getRawValue().schoolId;
        searchPerformanceData.classId = this.perfMetricsForm.getRawValue().classId;
        searchPerformanceData.month = this.perfMetricsForm.getRawValue().month;
        searchPerformanceData.week = this.perfMetricsForm.getRawValue().week;

        searchPerformanceData.schoolName = this.getSchoolName(this.perfMetricsForm.getRawValue().schoolId);
        searchPerformanceData.className = this.getClassName(this.perfMetricsForm.getRawValue().classId);

        return searchPerformanceData;
    }    

    private getSchoolName(schoolId: number): string {

        let schooName = '';
        this.schoolList.forEach(school => {
            if (school.id == schoolId) {
                schooName = school.schoolName;
            }
        });
        return schooName;
    }

    private getClassName(classId: number): string {

        let className = '';
        this.classList.forEach(classz => {
            if (classz.id == classId) {
                className = classz.className;
            }
        });
        return className;
    }

    public populateWeekWorkingDays($event): void {

        this.isSearchDataNotValid = false;
        this.searchDataErrorMsg = '';

        if (!ValidatorUtil.isEmpty(this.perfMetricsForm.getRawValue().schoolId)
            && !ValidatorUtil.isEmpty(this.perfMetricsForm.getRawValue().classId)
            && !ValidatorUtil.isEmpty(this.perfMetricsForm.getRawValue().month)) {

            this.isSpinner = true;

            let searchPerformanceMetrics: ISearchPerformanceMetrics = this.getSearchParamObject();

            this.performanceMetricsService.getWeekDaysByMonth(searchPerformanceMetrics).subscribe(
                (response) => {
                    console.log(response.result);
                    this.weekDays = response.result;
                    this.isSpinner = false;
                },
                error => {
                    console.log("Http Server error", error);
                    this.isSpinner = false;
                }
            );
        } else {
            ValidatorUtil.validateAllFormFields(this.perfMetricsForm);
            this.isSearchDataNotValid = true;
            this.searchDataErrorMsg = 'All fields are mandatory!';
            this.weekDays = new Map<String, String>();
        }
    }    

    selected(){
        alert(this.selectedClassName)
      }
}
