const router = require('express').Router();
const productsRouter = require('./products.router');
const homeRouter = require('./home.router');
const contactRouter = require('./contact.router');



// Création des différents endpoints de notre application. 
router.use('/', homeRouter)
router.use('/contact', contactRouter)
router.use('/products', productsRouter);

module.exports = router;