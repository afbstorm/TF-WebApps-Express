const router = require('express').Router();
const AdminController = require('../controllers/admin.controller');

router.get('/', AdminController.getNewDishForm);
router.post('/', AdminController.postNewDish);

module.exports = router;
