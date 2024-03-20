const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const jwtVerification = require('../middleware/jwtVerification');

router.route('/')
    .get(jwtVerification, usersController.getAll)
    .post(usersController.register)

router.route('/login')
    .post(usersController.login)

module.exports = router;