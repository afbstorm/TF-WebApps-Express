const router = require('express').Router();
const clientsController = require('../controllers/clients.controller');
const jwtVerification = require('../middlewares/jwtVerification');

router.route('/register')
    .post(clientsController.register)

router.route('/login')
    .post(clientsController.login)

router.route('/profile')
    .get(jwtVerification, clientsController.getProfile)

module.exports = router;