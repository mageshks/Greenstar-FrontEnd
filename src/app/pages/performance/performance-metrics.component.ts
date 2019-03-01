import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from './performance.service';
import { IStudentDetail } from '../student/student.interface';
import { SchoolData } from '../school/school.data';
import { StudentBulkUploadModalComponent } from '../student/student-bulk-upload.component.modal';
import { SchoolService } from '../school/school.service';
import { StudentService } from '../student/student.service';
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, IPerformanceMetricsDataTable, IClassWiseMetricsDataTable, ITeamWiseMetricsDataTable } from './performance-data.interface';
import { PerformanceStaticData, } from './performance-data.constant';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance.component.scss'],
    templateUrl: './performance-metrics.component.html',
})
export class PerformanceMetricsComponent implements OnInit {

    public performanceMetricsSource: IPerformanceMetricsDataTable = {} as IPerformanceMetricsDataTable;
    public classWiseMetricsSource: IClassWiseMetricsDataTable = {} as IClassWiseMetricsDataTable;
    public teamWiseMetricsSource: ITeamWiseMetricsDataTable = {} as ITeamWiseMetricsDataTable;

    constructor(
        private modalService: NgbModal,
        private performanceService: PerformanceService) {
    }

    ngOnInit(): void {
        this.performanceMetricsSource = PerformanceStaticData.getPerformanceMetricsTableContent();
        this.classWiseMetricsSource = PerformanceStaticData.getClassWiseTableContent();
        this.teamWiseMetricsSource = PerformanceStaticData.getTeamWiseTableContent();
    }

    public openBulkUploadMmodal(): void {
        const activeModal = this.modalService.open(PerformanceDataUploadModalComponent, { size: 'lg', container: 'nb-layout' });
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

        this.performanceMetricsSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceMetricsDays.forEach(
                    (performanceDay) => {
                        if (performanceDay.dateValue === headerObj.title) {
                            performanceDay.performanceDatas.forEach(
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

        this.performanceMetricsSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceMetricsDays.forEach(
                    (performanceDay) => {
                        if (performanceDay.dateValue === headerObj.title) {
                            performanceDay.performanceDatas.forEach(
                                (performanceData) => {
                                    performanceData.value = event.target.checked;
                                });
                        }
                    });
            });

        // check header checkbox
        this.performanceMetricsSource.headers.forEach(
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
        this.performanceMetricsSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceMetricsDays.forEach(
                    (performanceDay) => {
                        performanceDay.performanceDatas.forEach(
                            (performanceData) => {
                                performanceData.value = event.target.checked;
                            });
                    });
            });

        // check header checkbox
        this.performanceMetricsSource.headers.forEach(
            (performanceHeader) => {
                performanceHeader.checkValue = event.target.checked;
                performanceHeader.subTitleList.forEach(
                    (performanceHeader) => {
                        performanceHeader.checkValue = event.target.checked;
                    });
            });
        }
    
      public downloadExcelExport(): void {
        console.log("DownloadExcelExport -> ");
      }

}
