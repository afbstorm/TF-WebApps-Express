const router = require('express').Router();
const usersRouter = require('./users.router');
const productRouter = require('./products.router');

router.use('/users', usersRouter)
router.use('/products', productRouter)

module.exports = router;