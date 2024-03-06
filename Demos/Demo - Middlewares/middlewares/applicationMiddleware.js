const applicationMiddleware = (req, res, next) => {

    // A chaque appel d'une route dans le serveur, ce middlware va log la date, l'url appelé et la méthode HTTP
    console.log(`Requête envoyée à ${new Date().toLocaleDateString('fr')} depuis l'url ${req.url} avec pour méthode : ${req.method}`);

    // Continue l'éxécution de la requête. Sans le next(), on reste bloqué dans le middleware
    next();
};

module.exports = applicationMiddleware;