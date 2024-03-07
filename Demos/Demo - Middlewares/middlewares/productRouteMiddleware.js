const routeMiddleware = (req, res, next) => {

    const productName = 'Bonbon'

    // Si isAdmin === true, on continue la requête et l'utilisateur accède à la route. Si pas, on envoi un message d'erreur
    req.params.productName === 'Bonbon' ? next() : res.send('<h1> Ce n\'est pas le bon article </h1>');
};

module.exports = routeMiddleware;
