const request = require('supertest');
const app = require('../server');
const { setupDb, teardownDb } = require('./petUtils');

// Create a supertest agent from your Express app
const agent = request.agent(app);

beforeAll(async () => {
  await setupDb();
});

afterAll(async () => {
  await teardownDb();
});

describe('API calls with pet', () => {
  test('create a new pet', async () => {
    const newPet = {
      user_id: '1',
      name: 'Buddy',
      breed: 'Labrador',
      birthdate: '2022-01-01',
      profile_picture: 'buddy.png',
    };
    const res = await agent.post('/api/pets').send(newPet);
    expect(res.status).toBe(201);
  });
  test('fetchPetData should fetch pet data using supertest', async () => {
    const petId = 1;
    const res = await agent.get(`/api/pets/pet/${petId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        birthdate: '2022-01-01T05:00:00.000Z',
        breed: 'Labrador',
        id: 1,
        name: 'Buddy',
        profile_picture: 'buddy.png',
        user_id: '1',
      },
    ]);
  });

  test('fetchPetsByUser should fetch pets by user using supertest', async () => {
    const userId = 1;
    const res = await agent.get(`/api/pets/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        user_id: '1',
        name: 'Buddy',
        breed: 'Labrador',
        birthdate: '2022-01-01T05:00:00.000Z',
        profile_picture: 'buddy.png',
      },
    ]);
  });
});
