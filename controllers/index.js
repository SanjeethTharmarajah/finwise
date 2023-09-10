const router = require('express').Router();
const apiRoutes = require('./api');
const datainsightsRoutes = require('./datainsightsRoutes');

router.use('/api', apiRoutes);
routeer.use('/datainsights', datainsightsRoutes);

module.exports = router;
