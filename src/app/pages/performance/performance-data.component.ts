import { OnInit, Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from './performance.service';
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader } from './performance-data.interface';
import { PerformanceStaticData, } from './performance-data.constant';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-data.component.scss'],
    templateUrl: './performance-data.component.html',
})
export class PerformanceDataComponent implements OnInit {

    public performanceSource: IPerformanceDataTable = {} as IPerformanceDataTable;

    public isPerformanceChkboxEnabled = false;
    public isPerformanceEditEnabled = false;

    constructor(
        private modalService: NgbModal,
        private performanceService: PerformanceService) {
    }

    ngOnInit(): void {
        this.performanceSource = PerformanceStaticData.getTestTableContent();
    }

    public openBulkUploadMmodal(): void {
        const activeModal = this.modalService.open(PerformanceDataUploadModalComponent, { size: 'lg', container: 'nb-layout' });
    }

    public searchPerformanceData(): void {
        this.isPerformanceChkboxEnabled = false;
        
        this.isPerformanceEditEnabled = true;
    }

    public editPerformanceData(): void {
        this.isPerformanceChkboxEnabled = true;
    }

    public submitPerformanceData(): void {
        this.isPerformanceChkboxEnabled = false;
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

        this.performanceSource.performanceRows.forEach(
            (performanceRow) => {
                performanceRow.performanceDays.forEach(
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
                        performanceDay.performanceDatas.forEach(
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
