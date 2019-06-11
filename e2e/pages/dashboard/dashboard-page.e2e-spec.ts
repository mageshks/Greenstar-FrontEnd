import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { DashboardPage } from '../dashboard/dashboard-page.po';
import { LoginPage } from '../login/login-page.po';

describe('Green Star Application', () => {

    const login = new LoginPage();
    const dashboard = new DashboardPage();

    /* beforeEach(() => {
        
        var origFn = browser.driver.controlFlow().execute;
        browser.driver.controlFlow().execute = function () {
            var args = arguments;
            // queue 100 ms wait
            origFn.call(browser.driver.controlFlow(), function () {
                return protractor.promise.delayed(50);   // here we can adjust the execution speed
            });
            return origFn.apply(browser.driver.controlFlow(), args);
        };
       
       //browser.ignoreSynchronization = true;
    });
 */
    /*
    it('When user trying to login with wrong credentials he should stay on “login” page and see error notification', () => {
        const credentias = {
            username: 'test',
            password: 'test'
        };
        login.fillCredentials(credentias);
        expect(dashboard.getPageTitleText()).toEqual('Login');      
        expect(login.getErrorMessage()).toEqual('Invalid User Id and Password.');
    });    
    */
    
    it('When login is successful — he should redirect to default “Dashboard” page', () => {
        login.navigateToLogin();
        login.fillCredentials();        
        browser.sleep(5000);
        browser.ignoreSynchronization = true;
        expect(dashboard.getPageTitleText()).toEqual('Schools using Greenstar Application every month');
    });
    
    
    // school module - start
    it('When user click on school menu and it navigated to school screen.', () => {
        dashboard.navigateToSchoolScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/school');
    });

    it('When user try to search the school details', () => {        
        dashboard.setSearchSchoolParam();
        element(by.id('searchSchool')).click();
        browser.sleep(5000);
        expect(browser.driver.getCurrentUrl()).toContain('/school');
    });
    // school module - end

    // student module - start
    it('When user click on student menu and it navigated to student screen.', () => {
        dashboard.navigateToStudentScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/student');
    });

    it('When user try to search the student details', () => {
        dashboard.setSearchStudentParam();
        element(by.id('searchStudentBtn')).click();
        browser.sleep(5000);
        expect(browser.driver.getCurrentUrl()).toContain('/student');
    });
    // student module - end

    // performance data module - start
    it('When user click on performance data menu and it navigated to performance data screen.', () => {
        dashboard.navigateToPerfDataScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/performancedata');
    });

    it('When user try to search the performance details', () => {
        dashboard.setSearchPerformanceDataParam();
        element(by.id('searchPerfDataBtn')).click();
        browser.sleep(5000);
        expect(browser.driver.getCurrentUrl()).toContain('/performancedata');
    });

    it('When user try to reset the search performance data details', () => {
        element(by.id('searchResetPerfDataBtn')).click();
        expect(browser.driver.getCurrentUrl()).toContain('/performancedata');
    });
    // performance data module - end

    // performance star module - start
    it('When user click on performance star menu and it navigated to performance star screen.', () => {
        dashboard.navigateToPerfStarScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/performancestar');
    });

    it('When user try to search the performance star details', () => {
        dashboard.setSearchPerformanceStarParam();
        element(by.id('generateStarBtn')).click();
        browser.sleep(5000);
        expect(browser.driver.getCurrentUrl()).toContain('/performancestar');
    });    
    // performance star module - end

    // performance metric module - start
    it('When user click on performance metric menu and it navigated to performance metric screen.', () => {
        dashboard.navigateToPerfMetricsScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/performancemetrics');
    });

    it('When user try to search the performance metric details', () => {
        dashboard.setSearchPerformanceMetricParamForIndividual();
        element(by.id('viewMetricBtn')).click();
        browser.sleep(5000);
        expect(browser.driver.getCurrentUrl()).toContain('/performancemetrics');
    });    
    // performance metric module - end

    /*
    it('When user click on school menu and it navigated to school screen.', () => {
        dashboard.navigateToSchoolScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/school');
    });

    it('When user click on student menu and it navigated to student screen.', () => {
        dashboard.navigateToStudentScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/student');
    });

    it('When user click on performance data menu and it navigated to performance data screen.', () => {
        dashboard.navigateToPerfDataScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/performancedata');
    });

    it('When user click on performance star menu and it navigated to performance star screen.', () => {
        dashboard.navigateToPerfStarScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/performancestar');
    });

    it('When user click on performance metrics menu and it navigated to performance metrics screen.', () => {
        dashboard.navigateToPerfMetricsScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/performancemetrics');
    });

    it('When user click on admin menu and it navigated to admin screen.', () => {
        dashboard.navigateToAdminScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/admin');
    });

    it('When user click on dashboard menu and it navigated to dashboard screen.', () => {
        dashboard.navigateToDashboardScreen();
        expect(browser.driver.getCurrentUrl()).toContain('/dashboard');
    });
    */

});