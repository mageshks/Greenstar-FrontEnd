import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterModule } from '@angular/router';
import { NbDialogModule, NbSpinnerModule, NbStepperModule } from '@nebular/theme';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonService } from '../common/common.service';
import { CommonMockService } from '../common/mock/common.service.mock';
import { SchoolServiceMock } from './mocks/school.service.mock';
import { SchoolComponent } from './school.component';
import { SchoolData } from './school.data';
import { SchoolService } from './school.service';
import { SchoolMessageModalComponent } from './school-message.modal.component';

describe('School Component', () => {

    let component: SchoolComponent;
    let fixture: ComponentFixture<SchoolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            declarations: [SchoolComponent, SchoolMessageModalComponent],
            providers: [NgbActiveModal,
                { provide: SchoolService, useClass: SchoolServiceMock },
                { provide: CommonService, useClass: CommonMockService }
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ThemeModule,
                NbStepperModule,
                NbSpinnerModule,
                Ng2SmartTableModule,
                NgbModalModule,
                NbDialogModule.forRoot(),
                RouterModule.forRoot([])
            ]
        }).compileComponents();

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [SchoolMessageModalComponent],
            },
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchoolComponent);
        component = fixture.componentInstance;
    });

    it('Should school component create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('Should create new school and class details', async(() => {
        component.title = 'Add School Detail';
        component.action = 'create';
        component.stateList = component.stateList = SchoolData.getStates();
        component.ngOnInit();
        expect(component.perfParamDynamicDetail !== null);
    }));

    it('Should edit existing school and class details', async(() => {
        component.title = 'Edit School Detail';
        component.schoolId = 42;
        component.action = 'edit';
        component.stateList = component.stateList = SchoolData.getStates();
        component.ngOnInit();
        expect(component.perfParamDynamicDetail !== null);
    }));

    it('Should load the district, without selecting state dropdown', () => {
        component.title = 'Add School Detail';
        component.action = 'create';
        component.stateList = component.stateList = SchoolData.getStates();
        component.ngOnInit();

        component.onStateChange();
        expect(component.districtList.length > 0);
    });

    it('Should create new school and class details without entering mandatory information', async(() => {
        component.title = 'Add School Detail';
        component.action = 'create';
        component.stateList = component.stateList = SchoolData.getStates();
        component.ngOnInit();

        component.onSubmitChanges();
        expect(component.schoolDetail !== null);
    }));

    it('Should edit and update the existing school details', () => {
        component.title = 'Edit School Detail';
        component.schoolId = 42;
        component.action = 'edit';
        component.stateList = SchoolData.getStates();
        component.ngOnInit();

        component.onSubmitChanges();
        expect(component.schoolDetail !== null);
    });


});
