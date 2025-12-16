import { Page, expect } from "@playwright/test";
import { HelperBase } from './helperBase';

export class DatePickerPage extends HelperBase{

    readonly calendarInputField
    readonly calenderMonthAndYear
    readonly calenderChevronRight



    constructor(page: Page) {
        super(page)
    }

    async selectDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        const dateToAssert =await this.selectDateInTheCalendar(numberOfDaysFromToday);
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    async selectDateRangeFromToday(firstDateNumberOfDaysFromToday: number, secondDateNumberOfDaysFromToday: number) {
        const dateRangeInputField = this.page.getByPlaceholder('Range Picker');
        await dateRangeInputField.click();
        const firstDateToAssert = await this.selectDateInTheCalendar(firstDateNumberOfDaysFromToday);
        const secondDateToAssert = await this.selectDateInTheCalendar(secondDateNumberOfDaysFromToday);
        await expect(dateRangeInputField).toHaveValue(`${firstDateToAssert} - ${secondDateToAssert}`);
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
            //How to calculate the date dynamically
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        //Condition to handle the month change
        let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;

        while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click();

    
        return dateToAssert;

    }


}