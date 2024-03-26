const router = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const jwtVerification = require('../middlewares/jwtVerification');

router.route('/')
    .get(jwtVerification, ordersController.getOrders)

router.route('/create')
    .post(jwtVerification, ordersController.createOrder)

router.route('/:id')
    .get(jwtVerification, ordersController.getOrderById)
    
module.exports = router;