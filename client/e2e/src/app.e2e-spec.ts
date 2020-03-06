import {browser} from 'protractor';
import {AppPage} from './app.po';
import * as fs from 'fs';
import { downloadsFolder } from '../downloads-folder';
import { sleep } from './e2e.util';


describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getAppTitle()).toEqual('DoorBoard');
  });

  it('Should open the sidenav', () => {
    // Before clicking on the button, the sidenav should be hidden
    expect(page.getSidenav().isDisplayed()).toBe(false);

    page.openSideNav().then(() => {
      // After clicking the button the sidenav should be displayed
      expect(page.getSidenav().isDisplayed()).toBe(true);
    });
  });

  describe('The GENERATE PDF button:', () => {

    it('Should download a pdf', async () => {
      const downloadFilePath = `${downloadsFolder()}/${AppPage.downloadName}`;
      if (fs.existsSync(downloadFilePath)) {
        fs.unlinkSync(downloadFilePath);
      }
      expect(fs.existsSync(downloadFilePath)).toBeFalsy();

      page.clickGeneratePDFButton();
      // Wait 3 seconds for the file to download
      await sleep(3000);
      expect(fs.existsSync(downloadFilePath)).toBeTruthy();
    });

  });
});
