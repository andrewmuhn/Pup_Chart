const request = require('supertest');
const app = require('../server');
const { mockUser, hashPassword, setupDb } = require('./utils');

describe('Authentication Endpoints', () => {
    beforeEach(async () => {
        await setupDb();
    });

    it('should create a new user', async () => {
        const hashedPassword = await hashPassword(mockUser.password);
        const newUser = {
            name: mockUser.name,
            email: mockUser.email,
            password: hashedPassword,
        };

        const res = await request(app)
            .post('/api/users')
            .send(newUser);

        expect(res.status).toBe(201);
        expect(res.text).toMatch(/User added with ID: \d+/);
    });

});
