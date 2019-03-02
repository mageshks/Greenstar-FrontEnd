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
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, IPerformanceMetricsDataTable, IClassWiseMetricsDataTable, ITeamWiseMetricsDataTable } from './data/performance-data.interface';
import { PerformanceStaticData, } from './data/performance-data.constant';

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

}
