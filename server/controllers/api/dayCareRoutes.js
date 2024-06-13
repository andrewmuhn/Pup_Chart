const router = require('express').Router();
const pool = require('../../config/db');

router.get('/', async (_req, res) => {
  pool.query('SELECT * FROM daycare_plan', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

router.get('/:pet_id', (req, res) => {
  const pet_id = parseInt(req.params.pet_id);
  pool.query(
    'SELECT * FROM daycare_plan WHERE pet_id = $1',
    [pet_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
});

router.post('/', (req, res) => {
  const { food, walks, pet_id } = req.body;
  pool.query(
    'INSERT INTO daycare_plan (food, walks, pet_id) VALUES ($1, $2, $3) RETURNING *',
    [food, walks, pet_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`Daycare plan added with Id: ${results.rows[0].id}`);
    },
  );
});

router.put('/:daycare_id', (req, res) => {
  const daycare_id = parseInt(req.params.daycare_id);
  const { food, walks } = req.body;
  pool.query(
    'UPDATE daycare_plan SET food = $1, walks = $2 WHERE id = $3 RETURNING *',
    [food, walks, daycare_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .send(`Daycare plan modified with Id: ${results.rows[0].id}`);
    },
  );
});

router.delete('/:daycare_id', (req, res) => {
  const daycare_id = parseInt(req.params.daycare_id);
  pool.query(
    'DELETE FROM daycare_plan WHERE id = $1',
    [daycare_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .send(`Daycare plan deleted with Id: ${daycare_id}`);
    },
  );
});

module.exports = router;
