import { test, expect } from '@playwright/test'
import fs from 'fs'

let testData = {}
if (fs.existsSync('./data/users.json')) {
    testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
}

const apiKey = testData.apiKey || process.env.TRELLO_API_KEY
const apiToken = testData.apiToken || process.env.TRELLO_API_TOKEN
const boardTitle = testData.boardTitle || 'Test Board'
const listName = testData.listName || 'Test List'
const cardName = testData.cardName || 'Test Card'

test.describe('@regression: Create Card with API', () => {
    
    test('create card via API', async ({ request }) => {

        // create the test board
        const createBoardResponse = await request.post('https://api.trello.com/1/boards', {
            params: {
                name: boardTitle,
                key: apiKey,
                token: apiToken
            }
        })

        expect(createBoardResponse.status()).toBe(200);
        const board = await createBoardResponse.json();
        expect(board.name).toBe(boardTitle);

        // create the test list
        const createListResponse = await request.post('https://api.trello.com/1/lists', {
            params: {
                name: listName,
                idBoard: board.id,
                key: apiKey,
                token: apiToken
            }
        })

        expect(createListResponse.status()).toBe(200);
        const list = await createListResponse.json();
        expect(list.name).toBe(listName);
        expect(list.closed).toBe(false);
        expect(list.idBoard).toBe(board.id);

        // create the test card
        const createCardResponse = await request.post('https://api.trello.com/1/cards', {
            params: {
                name: cardName,
                idList: list.id,
                key: apiKey,
                token: apiToken
            }
         })

        expect(createCardResponse.status()).toBe(200);
        const card = await createCardResponse.json();

        expect(card.name).toBe(cardName);
        expect(card.closed).toBe(false);
        expect(card.idBoard).toBe(board.id);
        expect(card.idList).toBe(list.id);

        // delete the test board
        const deleteBoardResponse = await request.delete(`https://api.trello.com/1/boards/${board.id}`, {
            params: {
                key: apiKey,
                token: apiToken
            }
        })
        expect(deleteBoardResponse.status()).toBe(200);
    })  
})