import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test('navigate to form page', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.formLayoutsPage();
    await pm.navigateTo.datePickerPage();
    await pm.navigateTo.smartTablePage();
    await pm.navigateTo.toastrPage();
    await pm.navigateTo.tooltipPage();
});


test('parameterize methods in page objects', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo.formLayoutsPage();
    await pm.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
    await pm.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2');
    await pm.onFormsLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true);
})

test('date picker test', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.datePickerPage();
    await pm.onDatePickerPage.selectDateFromToday(5);
    await pm.onDatePickerPage.selectDateFromToday(30);
})

test('date range picker test', async ({ page }) => {

    const pm = new PageManager(page);
    await pm.navigateTo.datePickerPage();
    await pm.onDatePickerPage.selectDateRangeFromToday(5, 10);
})


