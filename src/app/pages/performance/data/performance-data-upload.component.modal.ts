import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PerformanceDataService } from "./performance-data.service";

@Component({
    selector: 'ngx-modal',
    templateUrl: './performance-data-upload.component.modal.html'
})
export class PerformanceDataUploadModalComponent {

    public uploadFile: File;

    constructor(
        private activeModal: NgbActiveModal,
        private performanceDataService: PerformanceDataService
    ) { }

    public uploadBulkData(): void {

    }

    public closeModal(): void {
        this.activeModal.close();
    }

}