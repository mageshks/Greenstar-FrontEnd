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
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, IPerformanceMetricsDataTable, IClassWiseMetricsDataTable, ITeamWiseMetricsDataTable, IEncouragingMetricsDataTable, ISearchPerformanceData } from './performance-metrics.interface';
import { PerformanceStaticData } from './performance-metrics.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISchoolDetail, IClassSectionDetail } from '../star/performance-star.interface';
import { ValidatorUtil } from '../../util/validator-util';
import { PerformanceStarService } from '../star/performance-star.service';

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
    public isSpinner: boolean = false;
    public perfMetricsForm: FormGroup;

    public schoolList: ISchoolDetail[];
    public classList: IClassSectionDetail[];

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private performanceMetricsService: PerformanceMetricsService,
        private performanceStarService: PerformanceStarService) {
    }

    ngOnInit(): void {
        this.performanceMetricsSource = PerformanceStaticData.getPerformanceMetricsTableContent();
        this.classWiseMetricsSource = PerformanceStaticData.getClassWiseTableContent();
        this.teamWiseMetricsSource = PerformanceStaticData.getTeamWiseTableContent();
        this.encouragingMetricsSource = PerformanceStaticData.getEncouragingTableContent();
        this.initializeForm();
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

    public resetPerformanceSearch(): void {
        this.initializeForm();
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

    public loadClassDetailsBySchool($event) : void {
        if (this.perfMetricsForm.getRawValue().schoolId != 0) {
            this.isSpinner = true;
            let schoolDetail: ISchoolDetail = {} as ISchoolDetail;
            schoolDetail.id = this.perfMetricsForm.getRawValue().schoolId;
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


    public viewIndividualPerformanceMetrics(): void {

        this.isSearchDataNotValid = false;
        if (this.perfMetricsForm.valid) {
            let searchPerformanceData: ISearchPerformanceData = {} as ISearchPerformanceData;
            searchPerformanceData.schoolId = this.perfMetricsForm.getRawValue().schoolId;
            searchPerformanceData.classId = this.perfMetricsForm.getRawValue().classId;
            searchPerformanceData.month = this.perfMetricsForm.getRawValue().month;
            searchPerformanceData.week = this.perfMetricsForm.getRawValue().week;

            this.loadIndividualPerformanceMetrics(searchPerformanceData);
        } else {
            //ValidatorUtil.validateAllFormFields(this.perfDataForm);
            this.isSearchDataNotValid = true;
        }
    }

    public loadIndividualPerformanceMetrics(searchPerformanceData: ISearchPerformanceData): void {
        this.isSpinner = true;
        this.performanceMetricsService.getIndividualPerformanceMetrics(searchPerformanceData).subscribe(
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
}
