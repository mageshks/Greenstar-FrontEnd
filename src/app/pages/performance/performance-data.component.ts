import { OnInit, Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from './performance.service';
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData } from './performance-data.interface';
import { PerformanceStaticData, } from './performance-data.constant';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-data.component.scss'],
    templateUrl: './performance-data.component.html',
})
export class PerformanceDataComponent implements OnInit {

    public performanceSource: IPerformanceDataTable = {} as IPerformanceDataTable;

    constructor(
        private modalService: NgbModal,
        private performanceService: PerformanceService) {
    }

    ngOnInit(): void {

        this.performanceSource = PerformanceStaticData.getTestTableContent();

    }

    public checkCellPerformanceDataStatus(event: any, performanceRow: IPerformanceRow, performanceDay: IPerformanceDay, performanceData: IPerformanceData): void {

        console.log(performanceRow);
        console.log(performanceDay);
        console.log(performanceData);

        performanceData.value = event.target.checked;
    }

    public checkPerformanceDataStatus(event: any, headerObj: any, subTitle: any): void {
        console.log("Header Event -> " + event.target.checked);
        console.log(headerObj);
        console.log(subTitle);
    }

}
