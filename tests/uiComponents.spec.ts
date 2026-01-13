import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test.describe('Form Layouts page', async () => {
    test.describe.configure({retries: 2});
    test.describe.configure({ mode: 'serial' }); //NOT RECOMMENDED
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })


    test('input fields', async ({ page}, testInfo ) => {

        if(testInfo.retry){
            //do something e.g. clear the database
        }
        const useingtheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByPlaceholder('Email');

        await useingtheGridEmailInput.fill('test@test.com');
        await useingtheGridEmailInput.clear();
        await useingtheGridEmailInput.pressSequentially('test2@test.com');

        //generic assertion
        const inputValue = await useingtheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com');

        //locator assertion
        await expect(useingtheGridEmailInput).toHaveValue('test2@test.com');
    });

    test('radio buttons', async ({ page }) => {
        const useingtheGridForm = page.locator('nb-card', { hasText: "Using the Grid" });
        //await useingtheGridForm.getByLabel('Option 1').check({force: true});
        await useingtheGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true });
        const radioStatus = await useingtheGridForm.getByLabel('Option 1').isChecked();
        expect(radioStatus).toBeTruthy();
        await expect(useingtheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked();
        
        await useingtheGridForm.getByRole('radio', { name: "Option 2" }).check({ force: true });
        expect(await useingtheGridForm.getByLabel('Option 1').isChecked()).toBeFalsy();
        expect(await useingtheGridForm.getByRole('radio', { name: "Option 2" }).isChecked()).toBeTruthy();
    })


});
    test('checkboxes', async ({ page }) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();

        //check() and uncheck() are verifying the state of the checkbox before performing any action
        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({ force: true});
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({ force: true});

        const allBoxes = page.getByRole('checkbox')
        for( const box of await allBoxes.all()){
            await box.uncheck({force: true});
            expect(await box.isChecked()).toBeFalsy();
        }
});

test('lists and dropdowns', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    page.getByRole('list'); //when the list has a UL tag
    page.getByRole('listitem'); //when the list has LI tag

    //const optionList = page.getByRole('list').locator('nb-option');
    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await optionList.filter({hasText: 'Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light" : "rgb(255, 255, 255)",
        "Dark" : "rgb(34, 43, 69)",
        "Cosmic" : "rgb(50, 50, 89)",
        "Corporate" : "rgb(255, 255, 255)"
    }

    await dropDownMenu.click();
    for(const color in colors){
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if(color !== "Corporate"){
            await dropDownMenu.click();
        }
    }
})

test('tooltips', async ({page})=>{
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Tooltip').click();

        const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'});
        await toolTipCard.getByRole('button', {name: 'Top'}).hover();

        //page.getByRole('tooltip'); //if you have a role tooltip created

        const toolTip = await page.locator('nb-tooltip').textContent();
        expect(toolTip).toEqual('This is a tooltip');
})

test ('dialog boxes', async ({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    });

    const deleteButton = page.locator('table tbody tr').first().locator('.nb-trash');
    await deleteButton.click();

    await expect(page.locator('table tbody tr').first()).not.toHaveText('mdo@gmail.com');
})

test('web tables', async ({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //1 - Get the row by any text in this row
    //const tableRow = page.locator('table tbody tr').filter({hasText: 'twitter@outlook.com'});
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"});
    await targetRow.locator('.nb-edit').click();
    const ageInput = page.locator('input-editor').getByPlaceholder('Age');
    await ageInput.clear();
    await ageInput.fill('35');
    await page.locator('.nb-checkmark').click();

    //2 - Get the row by specific value in a column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowByID = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click();
    const emailInput = page.locator('input-editor').getByPlaceholder('E-mail');
    await emailInput.clear();
    await emailInput.fill('test@test.de');
    await page.locator('.nb-checkmark').click();

    await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@test.de');

    //3 - Test filter of the table
    const ages = ['20', '30', '40', '200'];
    for(const age of ages){
        const ageFilterInput = page.locator('input-filter').getByPlaceholder('Age');
        await ageFilterInput.clear();
        await ageFilterInput.fill(age);
        await page.waitForTimeout(500); //wait for the table to refresh
        
        const ageRows = page.locator('tbody tr');

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent();
            if(age === '200'){
                expect(await page.getByRole('table').textContent()).toContain('No data found');
            } else {
            expect(cellValue).toEqual(age);
            }
        }
    }
})

test('date picker', async ({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    //How to calculate the date dynamically
    let date = new Date();
    date.setDate(date.getDate() + 200);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    //Condition to handle the month change
    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;

    while(!calenderMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
    await expect(calendarInputField).toHaveValue(dateToAssert);
})

test('sliders', async ({page})=>{
    //Update Attribute (Shortcut to set the position of the slider)
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630');
        node.setAttribute('cy', '232.630');
    })

    await tempGauge.click();

    //Mouse move to set the position of the slider
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();
    const box = await tempBox.boundingBox();
    //Setting starting coordinates to the center of the box
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    await page.mouse.move(x,y);
    await page.mouse.down();
    await page.mouse.move(x - 100, y);
    await page.mouse.move(x - 100, y+100);
    await page.mouse.up();

    await expect(tempBox).toContainText('13')
})