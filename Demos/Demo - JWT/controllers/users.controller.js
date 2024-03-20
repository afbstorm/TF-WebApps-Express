const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');

const usersController = {
    getAll: async (req, res) => {
        try {
            const result = await usersService.getAll();
            if (result) {
                res.status(200).json(result)
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }, 

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Vérification qu'il existe bel et bien un utilisateur enregistré avec l'email reçu dans la requête
            const user = await usersService.getUserByEmail(email);

            if (user.jwt) {
                // Si l'utilisateur a bien un jwt dans la db, on redirige vers la liste des utilisateurs
                return res.status(200).redirect('/api/users/');
            } else if (password) {
                // Si pas de jwt dans la db, on vérifie la validité du mot de passe
                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    // S'il n'est pas valide, on refuse l'accès a l'utilisateur et on indique pourquoi
                    return res.status(401).json({message: 'Password invalide'})
                }

                /* 
                * Composition d'un jwt (jsonwebtoken)
                * Header : Contient le type de token (dans notre cas un jwt) et l'algo de hashage (HS256)
                * Payload : Contient les claims (revendications / contenu / infos) et les données supplémentaires requises pour l'application
                * Signature : Sert à vérifier que le token n'a pas été modifier en cours de route 
                * (transfert http) et donc, sert à valider l'authenticité du token
                */

                const id = user.id;
                const payload = {
                    userId: id, // Identifiant de l'utilisateur (son id)
                    email: user.email // Email de l'utilisateur
                    // Possibilité d'en rajouter plus
                };
                const options = {
                    expiresIn: '2d' // 'xd' = x jours --- 'xh' = x heures --- 'xm' = x minutes --- 'xs' x secondes
                };

                const secret = process.env.JWT_SECRET; // Code secret de lecture du jwt
                const token = jwt.sign(payload, secret, options); // Création du jwt avec les 3 paramètres 
                const clientJwt = await usersService.login({token, id})

                if (clientJwt) {
                    // Ajout du header 
                    res.setHeader('Authorization', `Bearer ${token}`);
                    res.status(200).json({token});
                }
            }

            if (!user) {
                res.status(404).json({message: `L'utilisateur avec l'email : ${email} n'existe pas.`})
            }


        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }, 

    register: async (req, res) => {
        try {
            const { nom, prenom, age, password, email } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);

            const result = await usersService.register({nom, prenom, age, hashedPassword, email});
            if (result) {
                return res.status(200).json({message: 'Utilisateur correctement enregistré'})
            } else {
                return res.status(500).json({message: 'Le serveur a recontré un problème'})
            }

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
}

module.exports = usersController;