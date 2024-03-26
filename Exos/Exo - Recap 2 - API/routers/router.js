const router = require('express').Router();
const clientsRouter = require('./clients.router');
const ordersRouter = require('./orders.router');

router.use('/clients', clientsRouter);
router.use('/orders', ordersRouter);

module.exports = router;