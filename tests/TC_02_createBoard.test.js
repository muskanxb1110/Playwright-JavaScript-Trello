import { test } from "../testFixtures/fixture";
import { expect } from '@playwright/test';

test.describe.serial('@regression: Create and Delete Test Board Scenario', () => {
    test.beforeEach(async ({ boardPage }) => {
        await test.step('open trello', async () => {
            await boardPage.openApp();
        })        
        await test.step('confirm user is on home page', async () => {
            expect(await boardPage.getUrl()).toContain('https://trello.com/');
        })
    })

    test('Create a test board', async ({ boardPage }) => {
        await test.step('create a new board', async () => {
            await boardPage.clickCreateBoardButtonOne();
        })
        await test.step('insert board title', async () => {
            await boardPage.enterBoardTitle();
        })
        await test.step('click create board button', async () => {
            await boardPage.clickCreateBoardButtonTwo();
        })
        await test.step('confirm user is on board page', async () => {
            await boardPage.waitForBoardPage();
            expect(await boardPage.getUrl()).toContain('https://trello.com/b/');
        })
    })

    test('Delete a test board', async ({ boardPage }) => {
        await test.step('open the board', async () => {
            await boardPage.clickBoardTile();
        })
        await test.step('close the board', async () => {
            await boardPage.clickThreeDotsMenu();
            await boardPage.closeBoard();
            await boardPage.confirmCloseBoard();
        })
        await test.step('permanently delete the board', async () => {
            await boardPage.clickThreeDotsMenu();
            await boardPage.permanentDeleteBoard();
            await boardPage.confirmPermanentDeleteBoard();
        })
        await test.step('confirm user is on home page', async () => {
            await boardPage.waitForHomePage();
            expect(await boardPage.getUrl()).toContain('https://trello.com/');
        })
    })
})