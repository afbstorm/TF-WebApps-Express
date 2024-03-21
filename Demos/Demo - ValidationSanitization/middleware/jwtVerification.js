const jwt = require('jsonwebtoken');

const jwtVerification = (req, res, next) => {
    // Récupération de la clé secrète du/des jwt
    const secret = process.env.JWT_SECRET

    // Récupération du header 'Authorization'
    const authHeader = req.headers['authorization'];
    // authHeader = 'Bearer jvnorgnvnv.vnorehvoerhvoernvorenve.vuierbvinvoernv' mais on ne veut que la deuxième partie
    const token = authHeader && authHeader.split(' ')[1]; // ---> Récupération de la partie jvnorgnvnv.vnorehvoerhvoernvorenve.vuierbvinvoernv
    
    if (!token) {
        // Renvoi au client un forbidden
        res.sendStatus(401);
    } else {
        // Vérification de la validité du token
        jwt.verify(token, secret, (err, payload) => {
            if(err) {
                // Si non-valide on log l'erreur et on prévient le client avec Unauthorized
                console.error(err)
                res.sendStatus(403)
            } else {
                // Sinon, on envoi le payload dans la requête, et on continue la route demandée par le client
                req.payload = payload;
                next();
            }
        })
    }

}

module.exports = jwtVerification;