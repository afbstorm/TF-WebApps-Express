const router = require('express').Router();
const productsController = require('../controllers/products.controller');

router.route('/')
    .get(productsController.getAll)
    .post(productsController.addProduct)

router.route('/search/:name')
    .get(productsController.getProductByName)

router.route('/:id')
    .get(productsController.getProductById)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = router;