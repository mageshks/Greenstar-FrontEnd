import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class DashboardPage {
    
    navigateToLogin(): promise.Promise<any> {
        return browser.get('/greenstarui/login');
    }

    getPageTitleText() {
        return element(by.id('dashboardTitle')).getText();
    }

}