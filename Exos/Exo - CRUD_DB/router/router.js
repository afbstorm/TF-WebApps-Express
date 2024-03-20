const router = require('express').Router();
const queries = require('../database');

const productsRouter = require('./products.router');

// router.route('/')
//     .get(queries.getAll)
//     .post(queries.addUser)

// router.route('/:id')
//     .get(queries.getUserById)
//     .patch(queries.updateUser)
//     .delete(queries.deleteUser)

router.use('/products', productsRouter);

module.exports = router;