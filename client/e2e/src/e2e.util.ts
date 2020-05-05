import { AddNotePage } from './add-note.po';
import { browser, protractor, element, by } from 'protractor';
import { E2EEnvironment } from './e2e.env';
import { OwnerPage } from './owner.po';

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
    await addNotePage.clickAddNote();

    await browser.wait(EC.not(EC.urlContains('/new')), 10000);
  }

  public static async deleteAllNotes() {
    const ownerPage = new OwnerPage();

    ownerPage.navigateTo();

    await ownerPage.deleteAllNotes();
  }

  public static async login() {

    await browser.driver.get('http://localhost:4200/');
    browser.driver.sleep(5000);

    const currentUrl = await browser.driver.getCurrentUrl();
    console.log(currentUrl);

    if (currentUrl !== 'http://localhost:4200/') {
      await browser.waitForAngularEnabled(false);

      var emailField = element(by.name('email'));
      await emailField.sendKeys(E2EEnvironment.AUTH_USERNAME);

      var passwordField = element(by.name('password'));
      await passwordField.sendKeys(E2EEnvironment.AUTH_PASSWORD);

      var submitButton = element(by.name('submit'));
      await submitButton.click();

      browser.sleep(10000);
    }



      // browser.driver.get(currentUrl);
      // browser.driver.sleep(3000);
      // try {
      //   var emailField = browser.driver.findElement(by.name('email'));
      //   console.log((await emailField).getId());
      //   emailField.sendKeys(E2EEnvironment.AUTH_USERNAME);
      // } catch (err) {
      //   console.error(err);
      // }

  }
}
