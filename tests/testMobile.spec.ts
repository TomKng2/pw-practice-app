import { test, expect } from '@playwright/test';


test('input fields', async ({ page}, testInfo ) => {

        await page.goto('/');
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click();
        }

        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click();

        }

        const useingtheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByPlaceholder('Email');

        await useingtheGridEmailInput.fill('test@test.com');
        await useingtheGridEmailInput.clear();
        await useingtheGridEmailInput.pressSequentially('test2@test.com');
    
    });
