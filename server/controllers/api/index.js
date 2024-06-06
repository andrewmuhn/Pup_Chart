const router = require('express').Router();

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const daycareRoutes = require('./daycareRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/daycare', daycareRoutes);

module.exports = router;
