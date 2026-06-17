import { test } from "../testFixtures/fixture";
import { expect } from '@playwright/test';

test.describe.parallel('@regression: Login Scenario', () => {
    test('Login to Trello with valid credentials', async ({ loginPage }) => {
        await test.step('open trello', async () => {
            await loginPage.openApp();
        })

        // auth.json will allow user to login 
        
        await test.step('confirm user is on home page', async () => {
            expect(await loginPage.getUrl()).toContain('https://trello.com/');
        })
    })
}) 