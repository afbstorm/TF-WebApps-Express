const router = require('express').Router();
const productController = require('../controllers/dishes.controller');

// Création des routes pour les produits
router.get('/', productController.getDishes);
router.get('/details/:type/:id', productController.getDisheDetails);

module.exports = router;
