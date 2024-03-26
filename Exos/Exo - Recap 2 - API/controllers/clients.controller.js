const clientsService = require('../services/clients.service');
const ordersService = require('../services/orders.service');
const registerValidator = require('../validators/register.validator');
const authValidator = require('../validators/auth.validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const clientsController = {
    register: async (req, res) => {
        try {
            const validationResult = await registerValidator.validate(req.body);
            if (validationResult.error) {
                res.status(400).json({error: validationResult.error});
                return;
            }

            const { nom, email, motDePasse, adresseLivraison } = validationResult;
            const hashedPassword = bcrypt.hashSync(motDePasse, 10);

            const registrationResult = await clientsService.register({nom, email, hashedPassword, adresseLivraison});
            if (registrationResult.rowsAffected[0] > 0) {
                res.status(200).json({message: 'Enregistrement effectué avec succès'})
            } else {
                res.status(500).json({message: 'Enregistrement échoué'})
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500);
        }
    },

    getProfile: async (req, res) => {
        try {
            const { userId } = req.payload;
            const user = await clientsService.getProfile(userId);
            const orderHistory = await ordersService.getOrders(userId);
            if (!user) {
                res.status(404).json({message: 'Utilisateur introuvable'})
            } else {
                const profile = {
                    name: user.Nom,
                    email: user.Email,
                    address: user.AdresseLivraison
                }
                // res.status(200).json({message: 'Profil chargé avec succès', data: { profile, orderHistory} })
                res.status(200).json({message: 'Profil chargé avec succès', profile, orderHistory })
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500);
        }
    },

    login: async (req, res) => {
        try {

            const validationResult = await authValidator.validate(req.body);
            if (validationResult.error) {
                res.status(400).json({error: validationResult.error})
            }

            const { email, motDePasse } = validationResult;
            const user = await clientsService.login(email, motDePasse);
            if(!user) {
                res.status(401).json({message: 'Mot de passe est invalide'})
            } else {
                if (user.JWT !== null) {
                    return res.status(200).redirect('/api/clients/profile');
                }
                const payload = {
                    userId: user.ClientID,
                    email: user.email
                };
                const options = {
                    expiresIn: '5s'
                };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                const addToken = clientsService.updateJwt(user.ClientID, token)

                res.setHeader('Authorization', `Bearer ${token}`).json({token: token, message: 'Connecté avec succès'});
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500);
        }
    },
}

module.exports = clientsController;