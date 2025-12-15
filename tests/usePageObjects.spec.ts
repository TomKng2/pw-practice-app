import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';
import { on } from 'events';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datePickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
    await navigateTo.tooltipPage();
});


test('parameterize methods in page objects', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onFormsLayoutsPage = new FormLayoutsPage(page);

    await navigateTo.formLayoutsPage();
    await onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
    await onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2');
    await onFormsLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true);
})

test('date picker test', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onDatePickerPage = new DatePickerPage(page);
    await navigateTo.datePickerPage();
    await onDatePickerPage.selectDateFromToday(5);
    await onDatePickerPage.selectDateFromToday(30);
})

test('date range picker test', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onDatePickerPage = new DatePickerPage(page);
    await navigateTo.datePickerPage();
    await onDatePickerPage.selectDateRangeFromToday(5, 10);
})


