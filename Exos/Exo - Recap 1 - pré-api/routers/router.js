const router = require('express').Router();
const dishesRouter = require('./dishes.router');
const homeRouter = require('./home.router');
const reservationRouter = require('./reservation.router');
const adminRouter = require('./admin.router');


// Création des différents endpoints de notre application.
router.use('/', homeRouter)
router.use('/reservation', reservationRouter)
router.use('/menus', dishesRouter);
router.use('/admin', adminRouter);

module.exports = router;
