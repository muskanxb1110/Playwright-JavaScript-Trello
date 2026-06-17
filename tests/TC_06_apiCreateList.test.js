import { test, expect } from '@playwright/test'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

test.describe('@regression: Create List with API', () => {
    
    test('create list via API', async ({ request }) => {

        // create the test board
        const createBoardResponse = await request.post('https://api.trello.com/1/boards', {
            params: {
                name: testData.boardTitle,
                key: testData.apiKey,
                token: testData.apiToken
            }
        })

        expect(createBoardResponse.status()).toBe(200);
        const board = await createBoardResponse.json();
        expect(board.name).toBe(testData.boardTitle);
        // console.log(board);

        // create the test list
        const createListResponse = await request.post('https://api.trello.com/1/lists', {
            params: {
                name: testData.listName,
                idBoard: board.id,
                key: testData.apiKey,
                token: testData.apiToken
            }
        })

        expect(createListResponse.status()).toBe(200);
        const list = await createListResponse.json();
        expect(list.name).toBe(testData.listName);
        expect(list.closed).toBe(false);
        expect(list.idBoard).toBe(board.id);

        // delete the test board
        const deleteBoardResponse = await request.delete(`https://api.trello.com/1/boards/${board.id}`, {
            params: {
                key: testData.apiKey,
                token: testData.apiToken
            }
        })
        expect(deleteBoardResponse.status()).toBe(200);
    })  
})