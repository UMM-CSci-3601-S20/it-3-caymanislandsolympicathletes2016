import {browser, element, by} from 'protractor';

export class AppPage {
  static downloadName: string = 'DoorBoard.pdf';

  navigateTo() {
    return browser.get('/');
  }

  getAppTitle() {
    return element(by.className('app-title')).getText();
  }

  openSideNav() {
    return element(by.className('sidenav-button')).click();
  }

  getSidenav() {
    return element(by.className('sidenav'));
  }

  clickGeneratePDFButton() {
    element(by.buttonText('GENERATE PDF')).click();
  }
}
