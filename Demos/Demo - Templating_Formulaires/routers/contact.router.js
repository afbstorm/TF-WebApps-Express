const router = require('express').Router();
const ContactController = require('../controllers/contact.controller');

router.get('/', ContactController.getContact);
// Route post utilisée lors du submit du formulaire de contact
router.post('/', ContactController.postContact);

module.exports = router;