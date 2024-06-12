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
router.get('/', (_req, res) => {
  pool.query('SELECT * FROM pets', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// GET pets by user ID
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

// Delete route to delete pet
router.delete('/pet/:petId', (req, res) => {
  const petId = req.params.petId;
  pool.query(
    'DELETE FROM pets WHERE id = $1 RETURNING *',
    [petId],
    (error, results) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      if (results.rowCount === 0) {
        return res
          .status(404)
          .send(`Pet not found with ID: ${petId}`);
      }
      res
        .status(200)
        .send(`Pet deleted with ID: ${results.rows[0].id}`);
    },
  );
});

router.get('/shopping/:userId', (req, res) => {
  const userId = req.params.userId;
  pool.query(
    'SELECT food FROM pets JOIN daycare_plan ON pets.id = daycare_plan.pet_id WHERE user_id = $1',
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
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
