import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterModule } from '@angular/router';
import { NbDialogModule, NbLayoutModule, NbSpinnerModule, NbStepperModule, NbThemeModule } from '@nebular/theme';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonService } from '../common/common.service';
import { CommonMockService } from '../common/mock/common.service.mock';
import { RoleService } from '../common/role.service';
import { SchoolServiceMock } from './mocks/school.service.mock';
import { SchoolListComponent } from './school-list.component';
import { SchoolComponent } from './school.component';
import { SchoolService } from './school.service';

describe('School List Component', () => {

    let component: SchoolListComponent;
    let fixture: ComponentFixture<SchoolListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            declarations: [SchoolListComponent, SchoolComponent],
            providers: [NgbActiveModal, RoleService, 
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
                NbLayoutModule,
                NgbModule,
                NbThemeModule,
                NbDialogModule.forRoot(),
                RouterModule.forRoot([])
            ],
        }).compileComponents();

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [SchoolComponent],
            },
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchoolListComponent);
        component = fixture.componentInstance;
    });

    it('Should school list component create', async(() => {
        component.ngOnInit();
        expect(component).toBeTruthy();
    }));

    it('Should load the district, without selecting state dropdown', async(() => {
        component.ngOnInit();

        component.schoolSearchData.stateName = "--Select State--";
        component.onStateChange();
        expect(component.districtList.length > 0);
    }));

    it('Should load the district, while selecting state dropdown', async(() => {
        component.ngOnInit();
        
        component.schoolSearchData.stateName = "TAMIL NADU";
        component.onStateChange();
        expect(component.districtList.length > 0);
    }));

    it('Should load school details without search condition, while user click on search button', () => {

        component.ngOnInit();

        component.schoolSearchData.stateName = "TAMIL NADU";
        component.onStateChange();
        component.schoolSearchData.district = "COIMBATORE";

        component.onSearch();
        expect(component.schoolTableData === null);

    });

    it('Should load school details with search condition, while user click on search button', () => {

        component.ngOnInit();

        component.schoolSearchData.stateName = "TAMIL NADU";
        component.onStateChange();
        component.schoolSearchData.district = "COIMBATORE";

        component.onSearch();
        expect(component.schoolTableData !== null);
    });

    /*
    it('Should user to create new school details.', async(() => {
        component.ngOnInit();
        component.getSchoolTableSetting();

        component.schoolSearchData.stateName = "TAMIL NADU";
        component.onStateChange();
        component.schoolSearchData.district = "COIMBATORE";

        component.onSearch();
        component.createSchool();
        expect(component.schoolTableData !== null);
    }));
    */

});
