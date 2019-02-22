import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { StudentService } from "./student.service";

@Component({
    selector: 'ngx-modal',
    templateUrl: './student-bulk-upload.component.modal.html'
})
export class StudentBulkUploadModalComponent {

    public uploadFile: File;

    constructor(
        private activeModal: NgbActiveModal,
        private studentService: StudentService
    ) { }

    public downloadBulkUploadTemplate(): void {
        alert("Download Successfully Completed !..");
    }

    public uploadStudentBulkData(): void {

    }

    public closeModal(): void {
        this.activeModal.close();
    }

}