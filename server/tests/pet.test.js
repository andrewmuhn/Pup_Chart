const request = require('supertest');
const app = require('../server');

describe('API calls with pet', () => {
  test('should get all pets', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.status).toBe(200);
  });

  test('create a new pet', async () => {
    const newPet = {
      user_id: '1',
      name: 'Buddy',
      breed: 'Labrador',
      birthdate: '2022-01-01',
      profile_picture: 'buddy.png',
    };
    const res = await request(app).post('/api/pets').send(newPet);
    expect(res.status).toBe(201);
  });
  test('should fetch pet data for one pet', async () => {
    const petId = 1;
    const res = await request(app).get(`/api/pets/pet/${petId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        birthdate: '2018-01-01T05:00:00.000Z',
        breed: 'Golden Retriever',
        id: 1,
        name: 'Airbud',
        profile_picture: 'airbud.png',
        user_id: '1',
      },
    ]);
  });

  test('should fetch pets by user', async () => {
    const userId = 2;
    const res = await request(app).get(`/api/pets/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 5,
        user_id: '2',
        name: 'Balto',
        breed: 'husky',
        birthdate: '2016-01-01T05:00:00.000Z',
        profile_picture: 'rottweiler.jpg',
      },
    ]);
  });
});
