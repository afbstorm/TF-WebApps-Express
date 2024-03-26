// Créer le router via l'importation du module Router d'express
const router = require('express').Router();
const bookRouter = require('./book.router');

// Création des différents endpoints de notre serveur (/users; /books; /games)
router.use('/books', bookRouter);

module.exports = router;