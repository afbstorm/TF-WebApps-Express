const router = require('express').Router();
const productController = require('../controllers/products.controller');
const jwtVerification = require('../middleware/jwtVerification');

router.route('/')
    .get(jwtVerification, productController.getAll)

module.exports = router;