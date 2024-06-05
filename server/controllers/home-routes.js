const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('homepage');
  // res.render('home', {});
});

module.exports = router;
