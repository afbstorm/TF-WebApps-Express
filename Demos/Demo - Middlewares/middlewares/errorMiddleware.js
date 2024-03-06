// ⚠️ le middleware error à 4 paramètres contre 3 pour les autres middlewares ⚠️

const errorMiddleware = (error, req, res, next) => {

    console.log('Une erreur est survenue :', error);

    res.status(500).send('<h1>Erreur serveur</h1>');
};

module.exports = errorMiddleware;