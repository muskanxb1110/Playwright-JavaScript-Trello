import { expect } from '@playwright/test'
import {
    createBoardButtonStepOne,
    createBoardTitle,
    createBoardButtonStepTwo,
    boardTile,
    clickHorizontalThreeDotsTestBoard,
    closeBoardButton,
    redCloseBoardButtonPopup,
    permanentDeleteBoardButton,
    redDeleteBoardConfirmButtonPopup,
    createListButton,
    addListName,
    addListButton,
    listNameonBoard,
    addCardButton,
    addCardTextBox,
    addCardButtonFinal,
    cardNameonBoard
} from '../pageobjects/boardPage.js'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

class BoardPage {
    constructor(page) {
        this.page = page
    }

    async openApp() {
        await this.page.goto(`https://trello.com/u/${testData.trelloUsername}/boards`)
        await this.page.waitForLoadState('networkidle')
    }

    async clickCreateBoardButtonOne() {
        await this.page.click(createBoardButtonStepOne)
    }

    async enterBoardTitle() {
        await this.page.fill(createBoardTitle, testData.boardTitle)
    }

    async clickCreateBoardButtonTwo() {
        await this.page.click(createBoardButtonStepTwo)
    }

    async waitForBoardPage() {
        await this.page.waitForURL('**/b/**')
    }

    async getUrl() {
        return this.page.url()
    }

    async clickBoardTile() {
        await this.page.waitForSelector(boardTile)
        await this.page.click(boardTile)
    }

    async clickThreeDotsMenu() {
        await this.page.click(clickHorizontalThreeDotsTestBoard);
    }

    async closeBoard() {
        await this.page.waitForSelector(closeBoardButton)
        await this.page.click(closeBoardButton);
    }

    async confirmCloseBoard() {
        await this.page.click(redCloseBoardButtonPopup);
    }

    async permanentDeleteBoard() {
        await this.page.click(permanentDeleteBoardButton);
    }

    async confirmPermanentDeleteBoard() {
        await this.page.click(redDeleteBoardConfirmButtonPopup);
    }

    async waitForHomePage() {
        await this.page.waitForURL('**/u/**')
    }

    async createListonBoardPage() {
        await this.page.click(createListButton);
        await this.page.waitForSelector(addListName);
        await this.page.fill(addListName, testData.listName);
        await this.page.click(addListButton);
    }

    async confirmListonBoardPage() {
        await expect(this.page.locator(listNameonBoard, { hasText: testData.listName })).toBeVisible();
    }

    async createCardonBoardPage() {
        await this.page.click(addCardButton);
        await this.page.waitForSelector(addCardTextBox);
        await this.page.fill(addCardTextBox, testData.cardName);
        await this.page.click(addCardButtonFinal);
    }

    async confirmCardonBoardPage() {
        await expect(this.page.locator(cardNameonBoard, { hasText: testData.cardName })).toBeVisible();
    }

}

export default BoardPage