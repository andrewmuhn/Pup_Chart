const request = require('supertest');
const app = require('../server');


const normalizeDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

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
      profile_picture: '/images/buddy.png',
    };
    const res = await request(app).post('/api/pets').send(newPet);
    expect(res.status).toBe(201);
  });
  test('should fetch pet data for one pet', async () => {
    const petId = 1;
    const res = await request(app).get(`/api/pets/pet/${petId}`);

    expect(res.status).toBe(200);
    const responseBody = res.body.map((pet) => ({
      ...pet,
      birthdate: normalizeDate(pet.birthdate),
    }));

    expect(responseBody).toEqual([
      {
        birthdate: '2018-01-01',
        breed: 'Golden Retriever',
        id: 1,
        name: 'Airbud',
        profile_picture: '/images/airbud.png',
        user_id: '1',
      },
    ]);
  });

  test('should fetch pets by user', async () => {
    const userId = 2;
    const res = await request(app).get(`/api/pets/${userId}`);
    expect(res.status).toBe(200);
    const responseBody = res.body.map((pet) => ({
      ...pet,
      birthdate: normalizeDate(pet.birthdate),
    }));
    expect(responseBody).toEqual([
      {
        id: 3,
        user_id: '2',
        name: 'Scooby Doo',
        breed: 'Great Dane',
        birthdate: '2020-01-01',
        profile_picture: '/images/Scooby-Doo.png',
      },
      {
        id: 5,
        user_id: '2',
        name: 'Cujo',
        breed: 'husky',
        birthdate: '2016-01-01',
        profile_picture: '/images/Cujo_the_St._Bernard.webp',
      },
    ]);
  });
});
