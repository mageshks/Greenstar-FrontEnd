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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error on individual metrics search fields empty', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.viewIndividualPerformanceMetrics();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#errorMessage')).name == 'errorMessage');
    });
  });

  it('should display error on classwise metrics search fields empty', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.autoDetectChanges();
      component.viewClasswisePerformanceMetrics();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#errorMessage')).name == 'errorMessage');
    });
  });

  it('should display error on teamwise metrics search fields empty', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.viewTeamwisePerformanceMetrics();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#errorMessage')).name == 'errorMessage');
    });
  });

  it('should display error on encouraging metrics search fields empty', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.viewEncouragingPerformanceMetrics();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(fixture.debugElement.query(By.css('#errorMessage'))).toContain('All fields are mandatory!');
    });
  });

  it('should populate class dropdown on school change in Indvidual metrics screen', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.perfMetricsForm.setValue({
        schoolId : 313
      });
      component.loadIndividualClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");
    });
  });

  it('should populate class dropdown on school change in classwiese metrics screen', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.perfMetricsForm.setValue({
        schoolId : 313
      });
      component.loadIndividualClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");
    });
    
  });

  it('should populate class dropdown on school change in teamwise metrics screen', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.perfMetricsForm.setValue({
        schoolId : 313
      });
      component.loadIndividualClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");      
    });
  });

  it('should populate class dropdown on school change in encouraging metrics screen', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.perfMetricsForm.setValue({
        schoolId : 313
      });
      component.loadIndividualClassDetailsBySchool();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#classId')).name == "classId");
    });
  });

  it('should populate populate individual metrics on clicking the view individual metrics', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.perfMetricsForm.setValue({
        schoolId : 313,
        classId : 487,
        month: 1,
        week: 1
      });
      fixture.detectChanges();
      component.viewIndividualPerformanceMetrics();
      fixture.detectChanges();
      expect(component.performanceMetricsSource != null && component.performanceMetricsSource.headers !=null && component.performanceMetricsSource.headers.length>0)      
    });
  });
  it('should populate populate classwise metrics on clicking the view classwise metrics', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.classPerfMetricsForm.setValue({
        schoolId : 313,
        classId : 487
      });
      fixture.detectChanges();
      component.viewClasswisePerformanceMetrics();
      fixture.detectChanges();
      expect(component.classWiseMetricsSource != null && component.classWiseMetricsSource.className !=null)      
    });
  });
  it('should populate populate teamwise metrics on clicking the view teamwise metrics', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.teamPerfMetricsForm.setValue({
        schoolId : 313,
        classId : 487
      });
      fixture.detectChanges();
      component.viewTeamwisePerformanceMetrics();
      fixture.detectChanges();
      expect(component.teamWiseMetricsSource != null && component.teamWiseMetricsSource.className !=null)      
    });
  });
  it('should populate populate encouraging metrics on clicking the compare metrics', () => {
    fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.encouragingPerfMetricsForm.setValue({
        schoolId : 313,
        classId : 487,
        month1: 1,
        month2: 2
      });
      fixture.detectChanges();
      component.viewIndividualPerformanceMetrics();
      fixture.detectChanges();
      expect(component.encouragingMetricsSource != null && component.encouragingMetricsSource.metrics !=null)      
    });
  });

});
