const router = require('express').Router();
const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  console.info('Get all users api call!');
  res.send('Get all users api call!');
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res
        .status(500)
        .json({ errors: ['An error occurred. Please try again.'] });
    }

    pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword],
      (error, results) => {
        if (error) {
          throw error;
        }
        res
          .status(201)
          .send(`User added with ID: ${results.rows[0].id}`);
      },
    );
  });
});

router.post('/sessions', (req, res) => {
  const { email, password } = req.body;

  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ errors: ['An error occurred. Please try again.'] });
      }
      if (results.rows.length === 0) {
        return res
          .status(401)
          .json({ errors: ['Invalid email or password'] });
      }

      const user = results.rows[0];

      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          return res.status(500).json({
            errors: ['An error occurred. Please try again.'],
          });
        }
        if (isMatch) {
          const token = jwt.sign({ user_id: user.id }, 'secret', {
            expiresIn: '1h',
          });
          res.send({ jwt: token, user: user.id });
        } else {
          res
            .status(401)
            .json({ errors: ['Invalid email or password'] });
        }
      });
    },
  );
});

module.exports = router;
