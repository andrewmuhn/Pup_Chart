const router = require('express').Router();
const pool = require('../../config/db');

router.get('/', async (_req, res) => {
  pool.query('SELECT * FROM daycare_plan;', (error, results) => {
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
  const {
    food,
    walks,
    meal_schedule,
    cat_friendly,
    dog_friendly,
    kid_friendly,
    pet_id,
  } = req.body;
  pool.query(
    'INSERT INTO daycare_plan (food, walks, meal_schedule, cat_friendly, dog_friendly, kid_friendly, pet_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      food,
      walks,
      meal_schedule,
      cat_friendly,
      dog_friendly,
      kid_friendly,
      pet_id,
    ],
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

  const {
    food,
    walks,
    meal_schedule,
    cat_friendly,
    dog_friendly,
    kid_friendly,
  } = req.body;
  pool.query(
    'UPDATE daycare_plan SET food = $1, walks = $2, meal_schedule = $3, cat_friendly = $4, dog_friendly = $5, kid_friendly = $6  WHERE id = $7 RETURNING *',
    [
      food,
      walks,
      meal_schedule,
      cat_friendly,
      dog_friendly,
      kid_friendly,
      daycare_id,
    ],
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

router.get('/medications/:pet_id', (req, res) => {
  const pet_id = parseInt(req.params.pet_id);
  pool.query(
    `SELECT pets.id AS pet_id,
        daycare_plan.id AS daycare_id,
        daycare_plan.food,
        daycare_plan.meal_schedule,
        daycare_plan.cat_friendly,
        daycare_plan.dog_friendly,
        daycare_plan.kid_friendly,
        daycare_plan.walks,
        json_agg(
            json_build_object(
                'id', medication.id,
                'name', medication.name,
                'dose', medication.dose,
                'time_of_day', medication.time_of_day,
                'with_food', medication.with_food
            )
        ) AS medications
    FROM pets
    JOIN daycare_plan ON pets.id = daycare_plan.pet_id
    LEFT JOIN medication ON pets.id = medication.pet_id
    WHERE pets.id = $1
    GROUP BY pets.id, daycare_plan.id`,
    [pet_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
});

module.exports = router;
