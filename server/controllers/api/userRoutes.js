const router = require('express').Router();
const pool = require('../../config/db');

router.get('/', (req, res) => {
  console.info('Get all users api call!');
  res.send('Get all users api call!');
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`User added with ID: ${results.rows[0].user_id}`);
    },
  );
});

module.exports = router;
