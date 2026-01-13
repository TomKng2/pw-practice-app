import {expect, test} from '@playwright/test'

test.beforeEach(async({page}, testInfo)=>{
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    // Overwrites test timeout
    testInfo.setTimeout(testInfo.timeout + 2000);
})

test.skip('Auto-Waiting', async({page})=> {
    const successButton = page.locator('.bg-success');
    await successButton.click();

    //const text = await successButton.textContent();
    // await successButton.waitFor({state: "attached"});
    // const text = await successButton.allTextContents();
    // expect(text).toContain("Data loaded with AJAX get request.");


    await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000});
})


test.skip ('Alternative Waits', async({page})=>{
    const successButton = page.locator('.bg-success');


    // ____ wait for element
    //await page.waitForSelector('.bg-success');

    // ____ wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');


    // ____ wait for network calls to be completed ('NOT RECOMMENDED')
    //await page.waitForLoadState('networkidle');

    // NOT RECOMMENDED
    //await page.waitForTimeout(5000);

    const text = await successButton.allTextContents();
    expect(text).toContain("Data loaded with AJAX get request.");
})

test ('timeouts', async({page})=>{
    // overwrites test timeout
    //test.setTimeout(10000);
    // extends config test timeout * 3
    test.slow();
    const successButton = page.locator('.bg-success');
    // provided timeout can overwrite actiontimeout in config
    await successButton.click({timeout: 16000});
})
