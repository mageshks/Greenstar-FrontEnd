import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class DashboardPage {

    public getPageTitleText() {
        return element(by.id('dashboardTitle')).getText();
    }

    public navigateToDashboardScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/dashboard']")).click();
    }

    public navigateToSchoolScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/school']")).click();
    }

    public navigateToStudentScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/student']")).click();
    }

    public navigateToPerfDataScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/performancedata']")).click();
    }

    public navigateToPerfStarScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/performancestar']")).click();
    }

    public navigateToPerfMetricsScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/performancemetrics']")).click();
    }

    public navigateToAdminScreen(): void {
        element(by.xpath("//a[@href='/greenstarui/pages/admin']")).click();
    }

    public setSearchSchoolParam() {
        element(by.id('state')).sendKeys('TAMIL NADU');
        element(by.id('district')).sendKeys('COIMBATORE');        
    }

    public setSearchStudentParam() {
        element(by.id('school')).sendKeys('SSVM Matriculation school');
        element(by.id('className')).sendKeys('I-A');        
    }

    public setSearchPerformanceDataParam() {
        element(by.id('schoolId')).sendKeys('SSVM Matriculation school');
        element(by.id('classId')).sendKeys('I-A');
        element(by.id('month')).sendKeys('Jan');
        element(by.id('week')).sendKeys('Week-1');
    }

}