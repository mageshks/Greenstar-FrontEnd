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
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, IPerformanceMetricsDataTable, IClassWiseMetricsDataTable, ITeamWiseMetricsDataTable } from './performance-metrics.interface';
import { PerformanceStaticData } from './performance-metrics.constant';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-metrics.component.scss'],
    templateUrl: './performance-metrics.component.html'
})
export class PerformanceMetricsComponent implements OnInit {

    public performanceMetricsSource: IPerformanceMetricsDataTable = {} as IPerformanceMetricsDataTable;
    public classWiseMetricsSource: IClassWiseMetricsDataTable = {} as IClassWiseMetricsDataTable;
    public teamWiseMetricsSource: ITeamWiseMetricsDataTable = {} as ITeamWiseMetricsDataTable;

    constructor(
<<<<<<< HEAD:src/app/pages/performance/performance-metrics.component.ts
        private modalService: NgbModal) {
=======
        private modalService: NgbModal,
        private performanceMetricsService: PerformanceMetricsService) {
>>>>>>> df34b0e0b98d99526cc0d9bf33060aa28c1e6d17:src/app/pages/performance/metrics/performance-metrics.component.ts
    }

    ngOnInit(): void {
        this.performanceMetricsSource = PerformanceStaticData.getPerformanceMetricsTableContent();
        this.classWiseMetricsSource = PerformanceStaticData.getClassWiseTableContent();
        this.teamWiseMetricsSource = PerformanceStaticData.getTeamWiseTableContent();
    }

}
