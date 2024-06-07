const router = require('express').Router();
const pool = require('../../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the public/images directory exists
const imageDir = path.join(
  __dirname,
  '../../../client/public/images',
);
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

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

// GET pets by pet ID route
router.get('/pet/:petId', (req, res) => {
  const petId = req.params.petId;
  pool.query(
    'SELECT * FROM pets WHERE id = $1',
    [petId],
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post(
  '/uploadFileAPI',
  upload.single('file'),
  (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error('No file uploaded');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.status(200).json({ fileName: file.filename });
  },
);

module.exports = router;
