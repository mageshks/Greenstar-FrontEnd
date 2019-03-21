import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogModule, NbSpinnerModule, NbStepperModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SchoolServiceMock } from './mocks/school.service.mock';
import { SchoolComponent } from './school.component';
import { SchoolService } from './school.service';

describe('School Component', () => {

    let originalTimeout;
    let component: SchoolComponent;
    let fixture: ComponentFixture<SchoolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchoolComponent],

            providers: [
                { provide: SchoolService, useClass: SchoolServiceMock }
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
        fixture = TestBed.createComponent(SchoolComponent);
        component = fixture.componentInstance;

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('Should school component create', async(() => {
        component.ngOnInit();        
        expect(component).toBeTruthy();
    }));

    it('Should create new school and class details', async(() => {
        component.ngOnInit();        
        expect(component).toBeTruthy();
    }));

});
