import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeModule } from '../../../@theme/theme.module';
import { By } from '@angular/platform-browser';
import { PerformanceDataComponent } from './performance-data.component';
import { PerformanceDataServiceMock } from './mocks/performance-data.service.mock';
import { PerformanceDataService } from './performance-data.service';
import { PerformanceStarService } from '../star/performance-star.service';
import { PerformanceStarServiceMock } from '../star/mocks/performance-star.service.mock';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { PerformanceDataUploadModalComponent } from './performance-data-upload.component.modal';
import { PerformanceDataSuccessModalComponent } from './performance-data-success.component.modal';
import { CommonModule } from '@angular/common';
import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NbProgressBarModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbStepperModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbDialogModule,
    NbWindowModule,
    NbListModule,
    NbToastrModule,
    NbAlertModule,
    NbSpinnerModule,
    NbRadioModule,
    NbSelectModule,
    NbTooltipModule,
  } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbSecurityModule } from '@nebular/security';
// To test the green star component 
describe('PerforamnceComponent', () => {

    let component: PerformanceDataComponent;
    let fixture: ComponentFixture<PerformanceDataComponent>;

    const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

    const NB_MODULES = [
        NbCardModule,
        NbLayoutModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbMenuModule,
        NbUserModule,
        NbActionsModule,
        NbSearchModule,
        NbSidebarModule,
        NbCheckboxModule,
        NbPopoverModule,
        NbContextMenuModule,
        NgbModule,
        NbSecurityModule,
        NbProgressBarModule,
        NbCalendarModule,
        NbCalendarRangeModule,
        NbStepperModule,
        NbButtonModule,
        NbListModule,
        NbToastrModule,
        NbInputModule,
        NbAccordionModule,
        NbDialogModule,
        NbWindowModule,
        NbAlertModule,
        NbSpinnerModule,
        NbRadioModule,
        NbSelectModule,
        NbTooltipModule
      ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceDataComponent, PerformanceDataUploadModalComponent, PerformanceDataSuccessModalComponent],
            
            providers: [FormBuilder,
                { provide: PerformanceDataService, useClass: PerformanceDataServiceMock },
                { provide: PerformanceStarService, useClass: PerformanceStarServiceMock }
            ],            
            imports: [...BASE_MODULES, ...NB_MODULES],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceDataComponent);
        component = fixture.componentInstance;
    });

    it('Should perforamnce data component create', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('Should search the performance data without any search param', () => {
        component.ngOnInit();
        component.searchPerformanceData();
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#errorSpanMsg').textContent).toContain('All fields are mandatory!');
    });

    it('Should load the class and section dropdown based on selected school', async(() => {       
        component.ngOnInit();        
        let schoolValue = component.perfDataForm.controls['schoolId'].setValue(313);
        component.loadClassDetailsBySchool();
        fixture.detectChanges();
        expect(component.classList.length > 0);
    }));

    it('Should load the week dropdown based on selected school, class and month', async(() => {       
        
        component.ngOnInit();        
        component.perfDataForm.controls['schoolId'].setValue(313);
        component.loadClassDetailsBySchool();

        component.perfDataForm.controls['classId'].setValue(487);
        component.perfDataForm.controls['month'].setValue(2);

        component.populateWeekWorkingDays();
        fixture.detectChanges();

        expect(component.weekDays.size > 0);
    }));

    it('Should load the existing performance data based on selected school, class, month and week', async(() => { 
        
        component.ngOnInit();        
        component.perfDataForm.controls['schoolId'].setValue(313);
        component.loadClassDetailsBySchool();

        component.perfDataForm.controls['classId'].setValue(487);
        component.perfDataForm.controls['month'].setValue(2);

        component.populateWeekWorkingDays();

        component.perfDataForm.controls['week'].setValue("01-Feb-2019");

        component.searchPerformanceData();       

        expect(component.performanceSource.performanceRows.length > 0);
    }));

    it('Should empty for existing performance data based on selected school, class, month and week', async(() => { 
        
        component.ngOnInit();        
        component.perfDataForm.controls['schoolId'].setValue(313);
        component.loadClassDetailsBySchool();

        component.perfDataForm.controls['classId'].setValue(487);
        component.perfDataForm.controls['month'].setValue(2);

        component.populateWeekWorkingDays();

        component.perfDataForm.controls['week'].setValue("04-Feb-2019~05-Feb-2019~08-Feb-2019~09-Feb-2019");

        component.searchPerformanceData();       

        expect(component.performanceSource.performanceRows.length <= 0);
    }));
    
    it('Should reset search form data', () => {
        component.ngOnInit();
        fixture.detectChanges();
        component.resetPerformanceSearch();
        expect(component).toBeTruthy();
    });

    it('Should load the create new performance data based on selected school, class, month and week', async(() => { 
        
        component.ngOnInit();        
        component.perfDataForm.controls['schoolId'].setValue(313);
        component.loadClassDetailsBySchool();

        component.perfDataForm.controls['classId'].setValue(487);
        component.perfDataForm.controls['month'].setValue(2);

        component.populateWeekWorkingDays();

        component.perfDataForm.controls['week'].setValue("01-Feb-2019");

        component.addPerformanceData();       

        expect(component.performanceSource.performanceRows.length > 0);
    }));


    
    it('Should open bulk upload performance data', async(() => { 
        component.ngOnInit();
        fixture.detectChanges();
        component.openBulkUploadMmodal();
        expect(component).toBeTruthy();
    }));
    

});