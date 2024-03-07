const router = require('express').Router();
const userRouter = require('./user.router');
const productRouter = require('./products.router');

router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
