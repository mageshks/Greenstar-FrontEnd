import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogModule, NbSpinnerModule, NbStepperModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../../@theme/theme.module';
import { PerformanceDataServiceMock } from './mocks/performance-data.service.mock';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';
import { PerformanceDataService } from './performance-data.service';

describe('Perforamnce Data Bulk upload Component', () => {
   
    let component: PerformanceDataUploadModalComponent;
    let fixture: ComponentFixture<PerformanceDataUploadModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceDataUploadModalComponent],

            providers: [
                { provide: PerformanceDataService, useClass: PerformanceDataServiceMock }
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ThemeModule,
                NbStepperModule,
                NbSpinnerModule,
                NgbModule,
                NbDialogModule.forRoot()
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceDataUploadModalComponent);
        component = fixture.componentInstance;

    });
    
    it('Should perforamnce data bulk upload component create', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    /*
    it('Should close the data bulk upload modal popup alert', () => {
        component.ngOnInit();
        component.closeModal();
        expect(component).toBeTruthy();
    });

    it('Should upload the performance bulk upload with invalid file type', () => {
        component.ngOnInit();

        const blob = new Blob([""], { type: "text/html" });
        blob["lastModifiedDate"] = "03/20/2019";
        blob["name"] = "text.txt";

        const file = <File>blob;

        const fileList = {
            0: file,
            length: 1,
            item: (index: number) => file
        };

        component.handleFileInput(fileList);
        expect(component).toBeTruthy();
    });

    it('Should upload the performance bulk upload with valid file type', () => {
        component.ngOnInit();

        const blob = new Blob([""], { type: "text/html" });
        blob["lastModifiedDate"] = "03/20/2019";
        blob["name"] = "text.xlsx";

        const file = <File>blob;

        const fileList = {
            0: file,
            length: 1,
            item: (index: number) => file
        };

        component.handleFileInput(fileList);
        expect(component).toBeTruthy();
    });

    it('Should upload the performance bulk upload excel file', () => {
        component.ngOnInit();

        const blob = new Blob([""], { type: "text/html" });
        blob["lastModifiedDate"] = "03/20/2019";
        blob["name"] = "text.xlsx";

        const file = <File>blob;

        const fileList = {
            0: file,
            length: 1,
            item: (index: number) => file
        };

        component.uploadBulkData();
        expect(component).toBeTruthy();
    });
    */
});
