import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker }  from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navigate to form page', {tag: ['@smoke', '@regression']}, async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.formLayoutsPage();
    await pm.navigateTo.datePickerPage();
    await pm.navigateTo.smartTablePage();
    await pm.navigateTo.toastrPage();
    await pm.navigateTo.tooltipPage();
});


test('parameterize methods in page objects', {tag: '@smoke'}, async ({ page }) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomMail = faker.internet.email();
    const randomEmail = `${randomFullName.split(' ')[0]}@test.com`;
    const randomMailExample = `${randomFullName.replace(/ /g, "")}${faker.number.int(1000)}@test.com`;

    await pm.navigateTo.formLayoutsPage();
    //await pm.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(randomMail, 'Welcome1', 'Option 1');
    await pm.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USER, process.env.PASSWORD, 'Option 1');
    // page.screenshot({path: 'screenshots/formsLayoutPage.png'})
    //wait pm.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, 'Welcome1', 'Option 2');
    await pm.onFormsLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomMailExample, true);
    // await page.locator('nb-card', { hasText: "Inline form" }).screenshot({path: 'screenshots/inlineForm.png'})
})

test.skip('date picker test', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.datePickerPage();
    await pm.onDatePickerPage.selectDateFromToday(5);
    // const buffer = await page.screenshot();
    // console.log(buffer.toString('base64'));
    await pm.onDatePickerPage.selectDateFromToday(30);
})

test('date range picker test', async ({ page }) => {

    const pm = new PageManager(page);
    await pm.navigateTo.datePickerPage();
    await pm.onDatePickerPage.selectDateRangeFromToday(5, 10);
})
test.only('testing with argos ci', {tag: ['@smoke', '@regression']}, async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.formLayoutsPage();
    await pm.navigateTo.datePickerPage();
});

