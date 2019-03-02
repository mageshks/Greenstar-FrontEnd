import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PerformanceDataService } from "./performance-data.service";

@Component({
    selector: 'ngx-modal',
    templateUrl: './performance-data-upload.component.modal.html'
})
export class PerformanceDataUploadModalComponent implements OnInit {

    public uploadFile: File = null;
    public isDisableButton: boolean = true;

    constructor(
        private activeModal: NgbActiveModal,
        private performanceDataService: PerformanceDataService
    ) { }

    public ngOnInit(): void {
        this.uploadFile = null;
        this.isDisableButton = true;
    }

    public handleFileInput(files: FileList) {
        this.uploadFile = files.item(0);
        this.isDisableButton = false;
    }

    public uploadBulkData(): void {

        this.isDisableButton = true;

        if (this.uploadFile != null) {
            const formData = new FormData();
            formData.append('file', this.uploadFile);

            this.performanceDataService.uploadBulkPerformanceData(formData).subscribe(
                (response) => {
                    console.log(response);
                },
                error => {
                    console.log("Http Server error", error);
                }
            );
        } else {
            alert('Please upload File');
        }
    }

    public closeModal(): void {
        this.activeModal.close();
    }

}
