const router = require('express').Router();
const productController = require('../controllers/products.controller');

// Création des routes pour les produits
router.get('/', productController.getProducts);
router.get('/details/:id', productController.getProductDetails);

module.exports = router;