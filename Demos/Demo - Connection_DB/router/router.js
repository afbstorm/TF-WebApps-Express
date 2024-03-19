const router = require('express').Router();
const queries = require('../database');

router.route('/')
    .get(queries.getAll)
    .post(queries.addUser)

router.route('/:id')
    .get(queries.getUserById)
    .patch(queries.updateUser)
    .delete(queries.deleteUser)

module.exports = router;