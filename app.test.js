const request = require('supertest');
const app = require('./app');

describe('Currency API', () => {
    it('should convert amount from USD to JPY', async () => {
        const response = await request(app)
            .get('/currency')
            .query({ source: 'USD', target: 'JPY', amount: '$1,525' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            msg: 'success',
            amount: '$170,496.52'
        });
    });

    it('should handle invalid input', async () => { //缺少輸入(amount)
        const response = await request(app)
            .get('/currency')
            .query({ source: 'USD', target: 'JPY' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Invalid Input'
        });
    });

    it('should handle invalid source or target currency', async () => { //無效幣種
        const response = await request(app)
            .get('/currency')
            .query({ source: 'INVALID', target: 'JPY', amount: '$1,525' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Invalid Currency'
        });
    });
});