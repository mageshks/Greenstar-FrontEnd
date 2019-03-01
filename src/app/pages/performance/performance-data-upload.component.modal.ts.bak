import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PerformanceService } from "./performance.service";

@Component({
    selector: 'ngx-modal',
    templateUrl: './performance-data-upload.component.modal.html'
})
export class PerformanceDataUploadModalComponent {

    public uploadFile: File;

    constructor(
        private activeModal: NgbActiveModal,
        private performanceService: PerformanceService
    ) { }

    public downloadBulkUploadTemplate(): void {
        alert("Download Successfully Completed !..");
    }

    public uploadBulkData(): void {

    }

    public closeModal(): void {
        this.activeModal.close();
    }

}