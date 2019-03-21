import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PerformanceMetricsComponent } from './performance-metrics.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbDialogModule, NbStepperModule, NbSpinnerModule } from '@nebular/theme';
import { PerformanceMetricsService } from './performance-metrics.service';
import { PerformanceMetricsServiceMock } from './mocks/performance-metrics.service.mock';
import { By } from '@angular/platform-browser';
import { ISearchPerformanceMetrics } from './performance-metrics.interface';
import { PerformanceStarService } from '../star/performance-star.service';
import { PerformanceStarServiceMock } from '../star/mocks/performance-star.service.mock';
import { RouterModule } from '@angular/router';

// To test the performance metrics component 
describe('PerformanceMetricsComponent', () => {
  let originalTimeout;
  let component: PerformanceMetricsComponent;
  let fixture: ComponentFixture<PerformanceMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceMetricsComponent],
      providers: [{ provide: PerformanceStarService, useClass: PerformanceStarServiceMock },
        { provide: PerformanceMetricsService, useClass: PerformanceMetricsServiceMock }],
      imports: [
        ThemeModule,
        NbStepperModule,
        NbSpinnerModule,
        NbDialogModule.forRoot(),
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceMetricsComponent);
    component = fixture.componentInstance;
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  afterEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error on individual metrics search fields empty', () => {
    async(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.viewIndividualPerformanceMetrics();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#errorMessage')).name == 'errorMessage');
    });
    component.resetPerformanceSearch();
  });

  it('should display error on classwise metrics search fields empty', () => {
    async(() => {
      component.ngOnInit();
      fixture.autoDetectChanges();
      component.viewClasswisePerformanceMetrics();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#errorMessage')).name == 'errorMessage');
    });
    component.resetClasswisePerformanceSearch();
  });

  it('should display error on teamwise metrics search fields empty', () => {
    async(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.viewTeamwisePerformanceMetrics();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#errorMessage')).name == 'errorMessage');
    });
    component.resetTeamwisePerformanceSearch();
  });

  it('should display error on encouraging metrics search fields empty', () => {
    async(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.viewEncouragingPerformanceMetrics();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(fixture.debugElement.query(By.css('#errorMessage'))).toContain('All fields are mandatory!');
    });
  });

  it('should populate class dropdown on school change in Indvidual metrics screen', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.perfMetricsForm.controls['schoolId'].setValue(313);
      component.loadIndividualClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");
    });
  });

  it('should populate class dropdown on school change in classwiese metrics screen', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.classPerfMetricsForm.controls['schoolId'].setValue(313);
      component.loadClasswiseClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");
    });
    
  });

  it('should populate class dropdown on school change in teamwise metrics screen', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.teamPerfMetricsForm.controls['schoolId'].setValue(313);
      component.loadTeamwiseClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");      
    });
  });

  it('should populate class dropdown on school change in encouraging metrics screen', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.encouragingPerfMetricsForm.controls['schoolId'].setValue(313);
      component.loadEncouragingClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");
    });
  });

  it('should populate populate individual metrics on clicking the view individual metrics', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.perfMetricsForm.controls['schoolId'].setValue(313);
      component.perfMetricsForm.controls['classId'].setValue(487);
      component.perfMetricsForm.controls['month'].setValue(1);
      component.perfMetricsForm.controls['week'].setValue(1);
      fixture.detectChanges();
      component.viewIndividualPerformanceMetrics();
      fixture.detectChanges();
      expect(component.performanceMetricsSource != null && component.performanceMetricsSource.headers !=null && component.performanceMetricsSource.headers.length>0)      
    });
  });
  it('should populate populate classwise metrics on clicking the view classwise metrics', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.classPerfMetricsForm.controls['schoolId'].setValue(313);
      component.classPerfMetricsForm.controls['classId'].setValue(487);
      fixture.detectChanges();
      component.viewClasswisePerformanceMetrics();
      fixture.detectChanges();
      expect(component.classWiseMetricsSource != null && component.classWiseMetricsSource.className !=null)      
    });
  });
  it('should populate populate teamwise metrics on clicking the view teamwise metrics', () => {
    component.ngOnInit();
    async(() => {
      fixture.detectChanges();
      component.teamPerfMetricsForm.controls['schoolId'].setValue(313);
      component.teamPerfMetricsForm.controls['classId'].setValue(487);
      component.teamPerfMetricsForm.controls['month'].setValue(1);
      component.teamPerfMetricsForm.controls['week'].setValue(1);
      fixture.detectChanges();
      component.viewTeamwisePerformanceMetrics();
      fixture.detectChanges();
      expect(component.teamWiseMetricsSource != null && component.teamWiseMetricsSource.className !=null)      
    });
  });
  it('should populate populate encouraging metrics on clicking the compare metrics', () => {
    component.ngOnInit();
    async(() =>{
      fixture.detectChanges();
      component.encouragingPerfMetricsForm.controls['schoolId'].setValue(313);
      component.encouragingPerfMetricsForm.controls['classId'].setValue(487);
      component.encouragingPerfMetricsForm.controls['month1'].setValue(1);
      component.encouragingPerfMetricsForm.controls['month2'].setValue(2);
      fixture.detectChanges();
      component.viewEncouragingPerformanceMetrics();
      fixture.detectChanges();
      expect(component.encouragingMetricsSource != null && component.encouragingMetricsSource.metrics !=null)      
    });
  });

  it('Should load the week dropdown without search param', async(() => {

    component.ngOnInit();
    component.populateWeekWorkingDays();
    fixture.detectChanges();

    expect(component.weekDays.size <= 0);
}));

});
