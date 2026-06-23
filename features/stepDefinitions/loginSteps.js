const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const chai = require('chai');

const expect = chai.expect;

setDefaultTimeout(30 * 1000);

let browser;
let page;

Before(async function () {
  browser = await puppeteer.launch({ headless: false, slowMo: 10, args: ['--start-maximized'] });
  
  page = await browser.newPage();
});

After(async function () {
  await browser.close();
});

async function clearAndType(page, selector, value) {
  await page.waitForSelector(selector);
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Delete');
  await page.type(selector, value, { delay: 10 });
}

Given('the user is on the login page', async function () {
  await page.goto('https://practicetestautomation.com/practice-test-login/', {
    waitUntil: 'networkidle2',
    timeout: 10000
  });

  const title = await page.title();
  expect(title).to.include('Login');
});

When('the user enters valid credentials {string}, {string}', async function (username, password) {
  await clearAndType(page, 'input#username', username);
  await clearAndType(page, 'input#password', password);
});

When('the user enters invalid username {string}, {string}', async function (username, password) {
  await clearAndType(page, 'input#username', username);
  await clearAndType(page, 'input#password', password);
});

When('the user enters invalid password {string}, {string}', async function (username, password) {
  await clearAndType(page, 'input#username', username);
  await clearAndType(page, 'input#password', password);
});

When('the user clicks on the Login button', async function () {
  await page.click('#submit');
  await Promise.race([
    page.waitForSelector('.wp-block-button__link', { timeout: 10000 }),
    page.waitForSelector('div#error.show', { timeout: 10000 })
  ]);
});

Then('the user should see a welcome message', async function () {
  const logoutSelector = '.wp-block-button__link';
  await page.waitForSelector(logoutSelector);
  const text = await page.$eval(logoutSelector, el => el.textContent);
  expect(text).to.include('Log out');
});

Then('the user should see an error message containing {string}', async function (expectedMessage) {
  const errorSelector = 'div#error';
  await page.waitForSelector(errorSelector);
  const errorText = await page.$eval(errorSelector, el => el.textContent);
  expect(errorText).to.include(expectedMessage);
});