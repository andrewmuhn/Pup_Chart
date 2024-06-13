const router = require('express').Router();

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const daycareRoutes = require('./daycareRoutes');
const medicationRoutes = require('./medicationRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/daycare', daycareRoutes);
router.use('/medication', medicationRoutes);

module.exports = router;
