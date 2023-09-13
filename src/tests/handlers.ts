import { rest } from 'msw'
import { API_URL } from "../app/constants";
import { fakeQuotes } from './fakeData';

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
        const character = req.url.searchParams.get('character')
        const data: any[] = [];
        switch (character) {
            case null: 
                data.push(fakeQuotes.homer)
                break;
            case 'bart':
                data.push(fakeQuotes.bart)
                break;
            case 'homer':
                data.push(fakeQuotes.homer)
        }
        return res(ctx.json(data), ctx.delay(150))
    }), 
]