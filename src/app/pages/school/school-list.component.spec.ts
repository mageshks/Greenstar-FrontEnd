import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogModule, NbSpinnerModule, NbStepperModule } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonService } from '../common/common.service';
import { CommonMockService } from '../common/common.service.mock';
import { SchoolServiceMock } from './mocks/school.service.mock';
import { SchoolListComponent } from './school-list.component';
import { SchoolComponent } from './school.component';
import { SchoolService } from './school.service';
import { SchoolMessageModalContent } from './schoolMessageModalContent.component';

describe('School List Component', () => {

    //let originalTimeout;
    let component: SchoolListComponent;
    let fixture: ComponentFixture<SchoolListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchoolListComponent, SchoolComponent, SchoolMessageModalContent],

            providers: [ NgbModal, NgbActiveModal,
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
                NbDialogModule.forRoot()
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchoolListComponent);
        component = fixture.componentInstance;

        /* originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; */
    });
    
    /* afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    }); */

    
    it('Should school list component create', async(() => {
        component.ngOnInit();
        component.getSchoolTableSetting();
        expect(component).toBeTruthy();
    }));

    it('Should load the district, without selecting state dropdown', async(() => {
        component.ngOnInit();
        component.getSchoolTableSetting();

        component.schoolSearchData.stateName = "--Select State--";

        component.onStateChange();
        expect(component.districtList.length > 0);
    }));

    it('Should load the district, while selecting state dropdown', async(() => {
        component.ngOnInit();
        component.getSchoolTableSetting();

        component.schoolSearchData.stateName = "TAMIL NADU";

        component.onStateChange();
        expect(component.districtList.length > 0);
    }));
   
    it('Should load school details without search condition, while user click on search button', () => {
        fakeAsync(() => {
            component.ngOnInit();
            component.getSchoolTableSetting();

            component.schoolSearchData.stateName = "TAMIL NADU";
            component.onStateChange();
            component.schoolSearchData.district = "COIMBATORE";

            component.onSearch();

            expect(component.schoolTableData === null);
        });
    });

    it('Should load school details with search condition, while user click on search button', () => {
        fakeAsync(() => {
            component.ngOnInit();
            component.getSchoolTableSetting();

            component.schoolSearchData.stateName = "TAMIL NADU";
            component.onStateChange();
            component.schoolSearchData.district = "COIMBATORE";

            component.onSearch();

            expect(component.schoolTableData !== null);
        });
    });
    
    

    it('Should logged user have permission to create school.', async(() => {
        
        localStorage.setItem('roleName', 'Event POC');
        component.isGrantedRole();

        expect(component.schoolTableData !== null);
    }));

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
    


});
