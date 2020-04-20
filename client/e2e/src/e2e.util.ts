import { AddNotePage } from './add-note.po';
import { browser, protractor, by, element, until, By } from 'protractor';

const EC = protractor.ExpectedConditions;

export class E2EUtil {
   // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 public static randomText(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public static randomBoolean(): boolean {
    return Boolean(Math.round(Math.random()));
  }

  public static async addNewNote(body: string) {
    const addNotePage = new AddNotePage();
    addNotePage.navigateTo();

    await addNotePage.typeInput('bodyField', body);
    addNotePage.clickAddNote();

    await browser.wait(EC.not(EC.urlContains('/new')), 10000);
  }

  public static login() {
    browser.driver.sleep(3000);

    const emailField = browser.driver.wait(until.elementLocated(By.id('1-email')), 10000);
    emailField.click();
    emailField.sendKeys('test@user.com');

    const passwordField = element(By.name('password'));
    passwordField.click();
    passwordField.sendKeys('P4ssw0rd');

    const accessButton = element(By.name('submit'));
    accessButton.click();

    browser.driver.sleep(3000);
    browser.waitForAngularEnabled(true);
  }
}
