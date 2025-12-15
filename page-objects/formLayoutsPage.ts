import { Locator, Page } from '@playwright/test';

export class FormLayoutsPage {
    private readonly page: Page
    readonly useingTheGridForm: Locator
    readonly inlineForm: Locator


    constructor(page: Page) {
        this.page = page
        this.useingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" });
        this.inlineForm = this.page.locator('nb-card', { hasText: "Inline form" });
    }


    async submitUsingTheGridFormWithCredentialsAndSelectOption(emai: string, passowrd: string, optionText: string) {
        await this.useingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(emai);
        await this.useingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(passowrd);
        await this.useingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
        await this.useingTheGridForm.getByRole('button', { name: 'Sign in' }).click();
    }

    /**
     * This method fills out the Inline form with user details
     * @param name - should be first and last name
     * @param email - should be email for test user
     * @param rememberMe - should be true or false depending on whether the session should be saved or not
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {

        await this.inlineForm.getByPlaceholder('Jane Doe').fill(name);
        await this.inlineForm.getByPlaceholder('Email').fill(email);
        if(rememberMe){
            await this.inlineForm.getByRole('checkbox').check({ force: true});
        }
        await this.inlineForm.getByRole('button').click();
    }

}