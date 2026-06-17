import { expect } from '@playwright/test'
import {
    loginButtonInitial,
    usernameField,
    passwordField,
    continueButton,
    loginButton 
} from '../pageobjects/loginPage.js'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

const loginUrl = 'https://trello.com/login'

class LoginPage {
    constructor(page) {
        this.page = page
    }

    async openApp() {
        await this.page.goto('https://trello.com')
        await this.page.waitForLoadState('domcontentloaded')
    }

    async clickLoginButton() {
        await this.page.click(loginButtonInitial)
    }

    async enterUsername() {
        await this.page.fill(usernameField, testData.validUsername)
        await this.page.click(continueButton)
    }

    async enterPassword() {
        await this.page.fill(passwordField, testData.validPassword)
        await this.page.click(loginButton)
    }

    async getUrl() {
        return this.page.url()
    }

}

export default LoginPage