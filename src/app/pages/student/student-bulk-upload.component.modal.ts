import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { StudentService } from "./student.service";
import { saveAs as tempSaveAs } from 'file-saver';
import { IStudentSearchData } from "./student.interface";

@Component({
    selector: 'ngx-modal',
    templateUrl: './student-bulk-upload.component.modal.html'
})
export class StudentBulkUploadModalComponent {

    public uploadFile: File;

    public schoolId: number;

    public classId: number;

    public fileName: string;

    constructor(
        private activeModal: NgbActiveModal,
        private studentService: StudentService
    ) { }

    private resetUploadParam() {
        this.uploadFile = null;
        // this.fileName = '';
        //  this.isDisableButton = true;
        // this.isShowSuccessMsg = false;
        //  this.isShowErrorMsg = false;
        //  this.errorMessage = '';
        //  this.errorMessages = [];
    }

    public handleFileInput(files: FileList) {
        this.resetUploadParam();
        console.log('I am handled');
        if (files.item(0).name.split('.').pop() === 'xlsx') {
            console.log('I am an excel file');
            this.uploadFile = files.item(0);
            this.fileName = files.item(0).name;
            //  this.isDisableButton = false;
            //this.isShowSuccessMsg = false;
        } else {
            // this.isShowErrorMsg = true;
            // this.errorMessage = 'Please upload valid file in .xlsx file format';
        }
    }

    public downloadBulkUploadTemplate(): void {
        let searchParam: IStudentSearchData = new IStudentSearchData();
        searchParam.schoolId = this.schoolId;
        searchParam.classId = this.classId;
        this.studentService.getStudentDataTemplate(searchParam).subscribe(
            (response) => {
                var blob = new Blob([response], { type: 'application/octet-stream' });
                tempSaveAs(blob, "Bulk_Upload_Student_" + this.schoolId + "_" +new Date()+".xlsx");
            },
            error => {
                console.log("Http Server error", error);
            }
        );
    }

    public uploadStudentBulkData(): void {
        console.log('I am into upload' + this.uploadFile);
        //  this.isDisableButton = true;
        // this.isShowSuccessMsg = false;

        if (this.uploadFile != null) {
            console.log('I am not empty');
            const formData = new FormData();
            formData.append('file', this.uploadFile);
            formData.append('userId', 'Magesh');
            formData.append('schoolId', this.schoolId + '');

            // this.isSpinner = true;
            this.studentService.bulkUploadStudentData(formData).subscribe(
                (response) => {
                    //  this.isSpinner = false;
                    console.log("response ==> " + response);
                    if (response.message == null) {
                        console.log('response received success');
                        // this.isShowErrorMsg = true;
                        //this.errorMessage = '';
                        // this.errorMessages = response.result;
                        // this.isDisableButton = false;
                    } else {
                        console.log('response received with error');
                        this.uploadFile = null;
                        this.fileName = '';
                        // this.isDisableButton = true;
                        // this.isShowSuccessMsg = true;
                        // this.isShowErrorMsg = false;
                        //  this.errorMessage = '';
                    }
                },
                error => {
                    //this.isSpinner = false;
                    console.log("Http Server error", error);
                }
            );
        } else {
            // this.isShowErrorMsg = true;
            //this.errorMessage = 'Please upload valid file in .xlsx file format';
        }
    }

    public closeModal(): void {
        this.activeModal.close();
    }

}