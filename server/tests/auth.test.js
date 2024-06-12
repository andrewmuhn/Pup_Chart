const request = require('supertest');
const app = require('../server');
const { mockUser } = require('./utils');

describe('Authentication Endpoints', () => {
  let testUser;

  beforeAll(() => {
    testUser = {
      name: mockUser.name,
      email: `testuser@example.com`,
      password: mockUser.password,
    };
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Get all users api call!');
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send(testUser);
    expect(res.status).toBe(201);
    expect(res.text).toMatch(/User added with ID: \d+/);
  });

  it('should authenticate the test user and return a token', async () => {
    const res = await request(app)
      .post('/api/users/sessions')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('jwt');
    expect(res.body).toHaveProperty('user');
  });
});


