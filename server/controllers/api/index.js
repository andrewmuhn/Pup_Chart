const router = require('express').Router();

const userRoutes = require('./userRoutes');
const dayCareRoutes = require('./dayCareRoutes');

router.use('/users', userRoutes);
router.use('/daycare', dayCareRoutes);

module.exports = router;
