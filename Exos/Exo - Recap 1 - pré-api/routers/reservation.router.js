const router = require('express').Router();
const ReservationController = require('../controllers/reservation.controller');

router.get('/', ReservationController.getReservation);
// Route post utilisée lors du submit du formulaire de contact
router.post('/', ReservationController.postReservation);

module.exports = router;
