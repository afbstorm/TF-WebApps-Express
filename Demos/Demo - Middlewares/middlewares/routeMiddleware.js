const routeMiddleware = (req, res, next) => {

    // Vérification des droits utilisateur
    const isAdmin = false;

    // Si isAdmin === true, on continue la requête et l'utilisateur accède à la route. Si pas, on envoi un message d'erreur
    isAdmin ? next() : res.send('<h1> Vous n\'avez accès à cette page </h1>');
};

module.exports = routeMiddleware;