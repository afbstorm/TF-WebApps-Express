const jwt = require('jsonwebtoken');

const jwtVerification = (req, res, next) => {
    const secret = process.env.JWT_SECRET

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
    } else {
        jwt.verify(token, secret, (err, payload) => {
            if (err && err.name !== 'TokenExpiredError') {
                res.sendStatus(403);
            } else if (err && err.name === 'TokenExpiredError') {
                console.log('test');
                // Non valide, car expiration atteinte
                // On va récréer un token
                // ⚠️ Non secure ⚠️
                const decodedTokenPayload = jwt.decode(token)
                const newPayload = {
                    userId: decodedTokenPayload.userId,
                    email: decodedTokenPayload.email
                };

                // Création du nouveau token
                const newToken = jwt.sign(newPayload, secret, {expiresIn: '1d'});
                // Assignation du contenu du nouveau token dans le req.payload
                req.payload = newPayload;
                req.headers['authorization'] = `Bearer ${newToken}`;
                next();
            } else {
                req.payload = payload
                next();
            }
        })
    }
};

module.exports = jwtVerification;