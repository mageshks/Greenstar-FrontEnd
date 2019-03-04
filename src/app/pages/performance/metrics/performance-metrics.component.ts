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
import { IPerformanceDataTable, IPerformanceRow, IPerformanceDay, IPerformanceData, IPerformanceHeader, IPerformanceMetricsDataTable, IClassWiseMetricsDataTable, ITeamWiseMetricsDataTable, IEncouragingMetricsDataTable } from './performance-metrics.interface';
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
    public encouragingMetricsSource: IEncouragingMetricsDataTable = {} as IEncouragingMetricsDataTable;

    constructor(
        private modalService: NgbModal,
        private performanceMetricsService: PerformanceMetricsService) {
    }

    ngOnInit(): void {
        this.performanceMetricsSource = PerformanceStaticData.getPerformanceMetricsTableContent();
        this.classWiseMetricsSource = PerformanceStaticData.getClassWiseTableContent();
        this.teamWiseMetricsSource = PerformanceStaticData.getTeamWiseTableContent();
        this.encouragingMetricsSource = PerformanceStaticData.getEncouragingTableContent();
    }

}
