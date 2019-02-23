import { OnInit, Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from '../performance.service';
import { GreenstarComponent } from './greenstar/greenstar.component';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-star.component.scss'],
    templateUrl: './performance-star.component.html',
})
export class PerformanceStarComponent implements OnInit {

    constructor(
        private modalService: NgbModal,
        private performanceService: PerformanceService) {
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}
