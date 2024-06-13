const router = require('express').Router();
const pool = require('../../config/db');

router.get('/', async (_req, res) => {
  pool.query('SELECT * FROM medication', (error, results) => {
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
  const { name, dose, time_of_day, with_food, pet_id } = req.body;
  pool.query(
    'INSERT INTO daycare_plan (name, dose, time_of_day, with_food, pet_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, dose, time_of_day, with_food, pet_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`Medication plan added with Id: ${results.rows[0].id}`);
    },
  );
});

router.put('/:medication_id', (req, res) => {
  const medication_id = parseInt(req.params.medication_id);
  const { name, dose, time_of_day, with_food, pet_id } = req.body;
  pool.query(
    'UPDATE daycare_plan SET name = $1, dose = $2, time_of_day = $3, with_food = $4, pet_id = $5 WHERE id = $6 RETURNING *',
    [name, dose, time_of_day, with_food, pet_id, medication_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .send(
          `Medication plan modified with Id: ${results.rows[0].id}`,
        );
    },
  );
});

router.delete('/:medication_id', (req, res) => {
  const medication_id = parseInt(req.params.medication_id);
  pool.query(
    'DELETE FROM daycare_plan WHERE id = $1',
    [medication_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .send(`Medication plan deleted with Id: ${medication_id}`);
    },
  );
});

module.exports = router;
