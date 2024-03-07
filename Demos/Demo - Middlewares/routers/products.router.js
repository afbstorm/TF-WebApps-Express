const productsRouter = require('express').Router();
const productsController = require('../controllers/products.controller');
const productRouteMiddleware = require('../middlewares/productRouteMiddleware');

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/:productName', productRouteMiddleware, productsController.getProductByName);

module.exports = productsRouter;
