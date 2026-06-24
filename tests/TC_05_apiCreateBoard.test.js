import { test, expect } from '@playwright/test'
import fs from 'fs'

let testData = {}
if (fs.existsSync('./data/users.json')) {
    testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
}

const apiKey = testData.apiKey || process.env.TRELLO_API_KEY
const apiToken = testData.apiToken || process.env.TRELLO_API_TOKEN
const boardTitle = testData.boardTitle || 'Test Board'

test.describe('@regression: Create Board with API', () => {
    
    test('create board via API', async ({ request }) => {

        // create the test board
        const createResponse = await request.post('https://api.trello.com/1/boards', {
            params: {
                name: boardTitle,
                key: apiKey,
                token: apiToken
            }
        })

        expect(createResponse.status()).toBe(200);
        const board = await createResponse.json();
        expect(board.name).toBe(boardTitle);

        // delete the test board
        const deleteResponse = await request.delete(`https://api.trello.com/1/boards/${board.id}`, {
            params: {
                key: apiKey,
                token: apiToken
            }
        })
        expect(deleteResponse.status()).toBe(200);
    })  
})