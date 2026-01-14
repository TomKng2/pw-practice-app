import { test} from '../test-options';

import { faker }  from '@faker-js/faker';






test('parameterize methods in page objects', async ({ pageManager}) => {

    const randomFullName = faker.person.fullName();
    const randomMailExample = `${randomFullName.replace(/ /g, "")}${faker.number.int(1000)}@test.com`;

    //await pm.navigateTo.formLayoutsPage();

    await pageManager.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USER, process.env.PASSWORD, 'Option 1');

    await pageManager.onFormsLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomMailExample, true);

})



