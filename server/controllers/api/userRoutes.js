const router = require('express').Router();

router.get('/', (req, res) => {
  console.info('Get all users api call!');
  res.send('Get all users api call!');
});

module.exports = router;
