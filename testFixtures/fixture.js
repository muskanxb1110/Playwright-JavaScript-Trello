import { test as base } from '@playwright/test'
import LoginPage from '../pages/loginPage.js'
import BoardPage from '../pages/boardPage.js'

const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    boardPage: async ({ page }, use) => {
        await use(new BoardPage(page))
    }
})

export { test }