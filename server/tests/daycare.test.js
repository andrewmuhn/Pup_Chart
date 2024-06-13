const request = require('supertest');
const app = require('../server');
const mockDaycarePlan = require('./daycareUtils');

describe('Daycare api endpoints', () => {
  describe('GET /api/daycare/:pet_id', () => {
    it('should return a daycare plan for the pet with the matching id', async () => {
      const res = await request(app).get('/api/daycare/3');
      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toEqual({
        id: 3,
        pet_id: '3',
        food: 'Scooby Snax',
        walks: '4',
        cat_friendly: true,
        dog_friendly: false,
        kid_friendly: true,
        meal_schedule: 'breakfast-diner',
      });
    });
  });

  describe('POST /api/daycare/', () => {
    it('should return a status code of 201 with text confirming the daycare plan was added', async () => {
      const res = await request(app)
        .post('/api/daycare/')
        .send(mockDaycarePlan);
      expect(res.statusCode).toBe(201);
      expect(res.text).toMatch(/Daycare plan added with Id: \d+/);
    });
  });

  describe('PUT /api/daycare/:daycare_id', () => {
    it('should return a status code of 201 with text confirming the daycare plan was added', async () => {
      const res = await request(app)
        .put('/api/daycare/1')
        .send(mockDaycarePlan);
      expect(res.statusCode).toBe(200);
      expect(res.text).toMatch(/Daycare plan modified with Id: \d+/);
    });
  });
});
