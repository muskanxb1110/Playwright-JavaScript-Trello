import { test, expect } from '@playwright/test'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

test.describe('@regression: Create Board with API', () => {
    
    test('create board via API', async ({ request }) => {

        // create the test board
        const createResponse = await request.post('https://api.trello.com/1/boards', {
            params: {
                name: testData.boardTitle,
                key: testData.apiKey,
                token: testData.apiToken
            }
        })

        expect(createResponse.status()).toBe(200);
        const board = await createResponse.json();
        expect(board.name).toBe(testData.boardTitle);

        // delete the test board
        const deleteResponse = await request.delete(`https://api.trello.com/1/boards/${board.id}`, {
            params: {
                key: testData.apiKey,
                token: testData.apiToken
            }
        })
        expect(deleteResponse.status()).toBe(200);
    })  
})