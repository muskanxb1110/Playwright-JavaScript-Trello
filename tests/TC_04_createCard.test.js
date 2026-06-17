import { test } from "../testFixtures/fixture";
import { expect } from '@playwright/test';

test.describe.serial('@regression: Create a card', () => {
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

    test('Create a list', async ({ boardPage }) => {
        await test.step('open the board', async () => {
            await boardPage.clickBoardTile()
            await boardPage.waitForBoardPage()
        })
        await test.step('create a new list', async () => {
            await boardPage.createListonBoardPage();
        })
        await test.step('confirm list is on board page', async () => {
            await boardPage.confirmListonBoardPage();
        })
    })

    test('Create a card', async ({ boardPage }) => {
        await test.step('open the board', async () => {
            await boardPage.clickBoardTile()
            await boardPage.waitForBoardPage()
        })
        await test.step('create a new card', async () => {
            await boardPage.createCardonBoardPage();
        })
        await test.step('confirm card is on board page', async () => {
            await boardPage.confirmCardonBoardPage();
        })
    })

    test('Delete the test board to clean up', async ({ boardPage }) => {
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