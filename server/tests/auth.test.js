const request = require('supertest');
const app = require('../server');
const { mockUser, hashPassword, setupDb } = require('./utils');

describe('Authentication Endpoints', () => {
    beforeEach(async () => {
        await setupDb();
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/users');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Get all users api call!');
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
    
        console.log('Response body:', res.body); // Add this line
    
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', mockUser.name);
        expect(res.body).toHaveProperty('email', mockUser.email);
        console.log('user created', mockUser.email, mockUser.password, 'new user created', newUser.email, newUser.password);
    });
});
