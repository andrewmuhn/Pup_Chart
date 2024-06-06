const router = require('express').Router();
const pool = require('../../config/db');

// GET all pets route
router.get('/', (req, res) => {
  pool.query('SELECT * FROM pets', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// GET pets by user ID route
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  pool.query(
    'SELECT * FROM pets WHERE user_id = $1',
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
});

// POST route to add a new pet
router.post('/', (req, res) => {
  const { user_id, name, breed, birthdate, profile_picture } =
    req.body;
  pool.query(
    'INSERT INTO pets (user_id, name, breed, birthdate, profile_picture) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, name, breed, birthdate, profile_picture],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`Pet added with ID: ${results.rows[0].id}`);
    },
  );
});

module.exports = router;
